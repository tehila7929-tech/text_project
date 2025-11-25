import Screen from "../Screen/Screen"
import Files from "../Files/Files"
import { useState } from "react"
import Button from "../../Button"

export default function Document(props) {
    const [thisFile, setThisFile] = useState({ name: "Unnamed", screen: [] })

    return (
        <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", position: "relative" }}>
            <div style={{ position: "absolute", top: "5px", left: "5px", zIndex: 10 }}>
                <Button
                    clickAct={() => props.removeScreen(props.id)}
                    target="X"
                />
            </div>

            <Screen
                screen={props.screen}
                workingThisDocument={props.workingThisDocument}
                thisFile={thisFile}
            />

            <Files
                screen={props.screen}
                setScreen={props.setScreen}
                setAsActive={props.setAsActive}
                workingThisDocument={props.workingThisDocument}
                thisFile={thisFile}
                setThisFile={setThisFile}
                whatLanguage={props.whatLanguage}
            />
        </div>
    )
}