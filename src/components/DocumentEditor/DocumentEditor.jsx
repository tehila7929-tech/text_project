import Document from "./Document"
import { useState } from "react"
import Button from "../Button"
import "./DocumentEditor.css"

export default function DocumentEditor(props) {

    const [screenIds, setScreenIds] = useState([]);

    function newScreen() {
        props.setScreen([])
        const newId = Date.now();
        setScreenIds(prev => [...prev, newId]);
        props.setWorkingThisDocument(prev => {
            const newStatus = prev.map(() => false);
            return [...newStatus, true];
        });
    }

    const removeScreen = (idToRemove) => {
        const indexToRemove = screenIds.indexOf(idToRemove);
        if (indexToRemove === -1) return;
        setScreenIds(prev => prev.filter(id => id !== idToRemove));
        props.setWorkingThisDocument(prev => prev.filter((_, index) => index !== indexToRemove));
        props.setScreen([]);
    };


    const setOnlyThisActive = (indexToActivate) => {
        props.setWorkingThisDocument(prevDocs => {
            return prevDocs.map((_, index) => {
                return index === indexToActivate;
            });
        });
    };

    const openEditingTarget = props.whatLanguage === "english" ? "Open a new editing screen" : "פתח מסך עריכה חדש"

    return (
        <div className="documents-container">
            <div className="word-header">
                <div className="word-icon">📝</div>
                <div className="word-title">Word Editor</div>
                <Button clickAct={() => { newScreen() }} target={openEditingTarget} />
            </div>

            <div className="screens-container">
                {screenIds.map((id, index) => (
                    <Document
                        key={id}
                        id={id}
                        screen={props.screen}
                        setScreen={props.setScreen}
                        workingThisDocument={props.workingThisDocument[index]}
                        setAsActive={() => setOnlyThisActive(index)}
                        removeScreen={removeScreen}
                        whatLanguage={props.whatLanguage}
                    />
                ))}
            </div>
        </div>
    )
}