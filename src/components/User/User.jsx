import { useState } from 'react'
import DocumentEditor from "../DocumentEditor/DocumentEditor"
import Button from '../Button'
import LogInAndSignUp from './LogInAndSignUp'

function User(props) {
    return (
        <>{!(props.userLoggedIn) && <LogInAndSignUp setUserLoggedIn={props.setUserLoggedIn}></LogInAndSignUp>}
            {props.userLoggedIn && <DocumentEditor screen={props.screen} setScreen={props.setScreen} whatLanguage={props.whatLanguage}
                workingThisDocument={props.workingThisDocument} setWorkingThisDocument={props.setWorkingThisDocument} />}
        </>
    )
}

export default User