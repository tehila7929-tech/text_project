import Screen from "./Screen/Screen"
import Files from "./Files/Files"
import { useState } from "react"
import Button from "../Button"

export default function Document(props) {
    const [thisFile, setThisFile] = useState({ name: "Unnamed", screen: [] })

    return (
        <div className="document-window">
            <div className="document-header">
                <div className="document-title">
                    <span>{thisFile.name}</span>
                    <span className="file-status">
                        {props.workingThisDocument ? "✏️ עריכה" : "📄 צפייה"}
                    </span>
                </div>
                <div className="document-close-btn">
                    <Button
                        clickAct={() => props.removeScreen(props.id)}
                        target="✕"
                    />
                </div>
            </div>

            <Screen screen={props.screen} workingThisDocument={props.workingThisDocument} thisFile={thisFile} />

            <div className="files-toolbar">
                <Files screen={props.screen} setScreen={props.setScreen} setAsActive={props.setAsActive}
                    workingThisDocument={props.workingThisDocument} thisFile={thisFile}
                    setThisFile={setThisFile} whatLanguage={props.whatLanguage}
                />
            </div>
        </div>
    )
}