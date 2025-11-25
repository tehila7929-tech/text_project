import Document from "./Document/Document"
import { useState } from "react"
import Button from "../Button"

export default function DocumentEditor(props) {

    const [screenIds, setScreenIds] = useState([]);
    const [workingThisDocument, setWorkingThisDocument] = useState([])

    function newScreen() {
        props.setScreen([])
        const newId = Date.now();
        setScreenIds(prev => [...prev, newId]);

        setWorkingThisDocument(prev => {
            const newStatus = prev.map(() => false);
            return [...newStatus, true];
        });
    }

    const removeScreen = (idToRemove) => {
        const indexToRemove = screenIds.indexOf(idToRemove);
        if (indexToRemove === -1) return;
        setScreenIds(prev => prev.filter(id => id !== idToRemove));
        setWorkingThisDocument(prev => prev.filter((_, index) => index !== indexToRemove));
        props.setScreen([]);
    };

    const setOnlyThisActive = (indexToActivate) => {
        setWorkingThisDocument(prevDocs => {
            return prevDocs.map((_, index) => {
                return index === indexToActivate;
            });
        });
    };

    const openEditingTarget = props.whatLanguage === "english" ? "Open a new editing screen" : "פתח מסך עריכה חדש"

    return (
        <>
            <Button clickAct={() => { newScreen() }} target={openEditingTarget} />
            {screenIds.map((id, index) => (
                <Document
                    key={id}
                    id={id} 
                    screen={props.screen}
                    setScreen={props.setScreen}
                    workingThisDocument={workingThisDocument[index]}
                    setAsActive={() => setOnlyThisActive(index)}
                    removeScreen={removeScreen}
                    whatLanguage={props.whatLanguage}
                />
            ))}
        </>
    )
}