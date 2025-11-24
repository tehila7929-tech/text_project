import { useState } from 'react'
import DocumentEditor from "../DocumentEditor/DocumentEditor"
import Button from '../Button'

function User(props) {
    return (
        <>
            <DocumentEditor screen={props.screen} setScreen={props.setScreen} />
        </>
    )
}

export default User