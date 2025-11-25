import Document from "./Document/Document"
import { useState } from "react"
import Button from "../Button"

export default function DocumentEditor(props) {

    const [screenIds, setScreenIds] = useState([]);
    const [workingThisDocument, setWorkingThisDocument] = useState([])

    function newScreen() {
        setScreenIds(prev => [...prev, prev.length]);
        setOnlyThisActive(screenIds.length)
        setWorkingThisDocument(prev => [...prev, true]);
    }

    const setOnlyThisActive = (indexToActivate) => {
        setWorkingThisDocument(prevDocs => {
            return prevDocs.map((_, index) => {
                if (index === indexToActivate) {
                    return true;
                } else {
                    return false;
                }
            });
        });
    };
    const openEditingTarget = props.whatLanguage == "english" ? "Open a new editing screen" : "פתח מסך עריכה חדש"
    return (
        <>
            <Button clickAct={() => { newScreen() }} target={openEditingTarget} />
            {screenIds.map((id, index) => (
                < Document
                    key={id}
                    screen={props.screen}
                    setScreen={props.setScreen}
                    workingThisDocument={workingThisDocument[index]}
                    setAsActive={() => setOnlyThisActive(index)}
                    whatLanguage={props.whatLanguage}
                />
            ))}
        </>
    )
}

//פתיחה
//מחיקת מסך
//להוסיף למערך של אחרונים גם על איזה קובץ הוא עבד