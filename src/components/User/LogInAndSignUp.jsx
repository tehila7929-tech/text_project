import { useState } from "react";
import "./LogInAndSignUp.css";

let email
let password
export default function LogInAndSignUp(props) {
    const [errorMessage, setErrorMessage] = useState("")
    function inputValidity() {
        if (!email || !password) {
            setErrorMessage("אנא מלא את כל השדות");
            return false;
        }
        const emailPattern = /^(?=.*@).+[^@]$/;
        if (!emailPattern.test(email)) {
            setErrorMessage("פורמט אימייל לא תקין");
            return false;
        }
        return true;
    }

    function logIn() {
        if (inputValidity()) {
            const users = JSON.parse(localStorage.getItem('users')) || []
            users.map((user) => {
                if (user.email == email && user.password == password) {
                    localStorage.setItem('currentUser', JSON.stringify(email))
                    props.setUserLoggedIn(true)
                    return
                }
            })
            setErrorMessage("המשתמש לא קיים או שאחד הפרטים שהזנת שגוי")
        }
    }

    function signUp() {
        if (inputValidity()) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            let userExists = false;

            users.forEach((user) => {
                if (user.email === email) {
                    userExists = true;
                }
            });

            if (userExists) {
                setErrorMessage("משתמש עם אימייל זה כבר קיים");
                return;
            }

            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(email))
            props.setUserLoggedIn(true);
        }
    }
    return (
        <div className="login-container">
            <div className="login-box">
                <input
                    className="login-input"
                    type="email"
                    onChange={(event) => { email = event.target.value }}
                    placeholder="אימייל"
                />
                <input
                    className="login-input"
                    type="password"
                    onChange={(event) => { password = event.target.value }}
                    placeholder="סיסמה"
                />
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="login-buttons">
                    <button className="login-btn primary" onClick={() => logIn()}>התחבר</button>
                    <button className="login-btn secondary" onClick={() => signUp()}>הירשם</button>
                </div>
            </div>
        </div>
    )
}