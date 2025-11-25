import Button from "../Button";
import { useState } from "react";
let email
let password
export default function LogInAndSignUp(props) {
    const [errorMessage, setErrorMessage] = useState(<div></div>)
    function inputValidity() {
        if (!email || !password) {
            setErrorMessage(<div>Please fill in all fields.</div>);
            return false;
        }
        const emailPattern = /^(?=.*@).+[^@]$/;
        if (!emailPattern.test(email)) {
            setErrorMessage(<div>Invalid email format.</div>);
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
            setErrorMessage(<div>The user does not exist yet or one of the details you entered is incorrect.</div>)
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
                setErrorMessage(<div>A user with this email already exists.</div>);
                return;
            }

            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(email))
            props.setUserLoggedIn(true);
        }
    }
    return (<>
        <input
            type="mail"
            onChange={(event) => { email = event.target.value }}
            placeholder="email"
        />
        <input
            type="password"
            onChange={(event) => { password = event.target.value }}
            placeholder="password"
        />
        {errorMessage}
        <Button clickAct={() => logIn()} target={"log in"}></Button>
        <Button clickAct={() => signUp()} target={"sign up"}></Button>

    </>)
}