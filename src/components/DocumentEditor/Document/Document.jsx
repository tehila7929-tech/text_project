import Screen from "../Screen/Screen"
import Files from "../Files/Files"
import { useState } from "react"



export default function Document(props) {
    return (<>
        <div>
            <Screen screen={props.screen} workingThisDocument={props.workingThisDocument} />
            <Files screen={props.screen} setScreen={props.setScreen}
                setWorkingThisDocument={props.setWorkingThisDocument} setAsActive={props.setAsActive} />
        </div>
    </>)
}