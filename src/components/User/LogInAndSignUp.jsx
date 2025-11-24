import Button from "../Button";
let email
let password
export default function LogInAndSignUp() {
    return (<>
        <input
            type="mail"
            onChange={(event)=>{email=event.target.value}}
            placeholder="כתובת מייל"
        />
    </>)
}