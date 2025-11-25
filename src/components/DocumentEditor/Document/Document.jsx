import Screen from "../Screen/Screen"
import Files from "../Files/Files"
import { useState } from "react"



export default function Document(props) {
    const [thisFile, setThisFile] = useState({ name: "no file", screen: [] })
    return (<>
        <div>
            <Screen screen={props.screen} workingThisDocument={props.workingThisDocument} thisFile={thisFile}/>
            <Files screen={props.screen} setScreen={props.setScreen}
                setAsActive={props.setAsActive} workingThisDocument={props.workingThisDocument}
                thisFile={thisFile} setThisFile={setThisFile} whatLanguage={props.whatLanguage}/>
        </div>
    </>)
}