import Document from "./Document/Document"
import { useState } from "react"
import Button from "../Button"

export default function DocumentEditor(props) {
    // const [documentEditor, setDocumentEditor] = useState([])
    // function newScreen() {
    //     setDocumentEditor(prevDocumentEditor => [...prevDocumentEditor, <Document screen={props.screen} setScreen={props.setScreen} key={prevDocumentEditor.length} />]);
    // }
    // return (<>
    //     {/* {documentEditor.map((Document, index) => {
    //         return Document
    //     })} */}
    //     {documentEditor}
    //     <Button clickAct={() => { newScreen() }} target="Open a new editing screen" />
    // </>)

    const [screenIds, setScreenIds] = useState([]);
    const [workingThisDocument, setWorkingThisDocument] = useState([])

    function newScreen() {
        setScreenIds(prev => [...prev, prev.length]);
        setOnlyThisActive(screenIds.length)
        setWorkingThisDocument(prev => [...prev, true]);
    }

    // function updateStatus(index, val) {
    //     setWorkingThisDocument(prev => {
    //         const updated = [...prev];
    //         updated[index] = val;
    //         return updated;
    //     })
    // }

    // function updateAllStatus() {
    //     setWorkingThisDocument(prev => {
    //         const updated = [...prev];
    //         updated.forEach((element, index) => {
    //             updated[index] = false;
    //         });
    //         return updated;
    //     })
    // }

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

    return (
        <>
            <Button clickAct={() => { newScreen() }} target="Open a new editing screen" />
            {screenIds.map((id, index) => (
                < Document
                    key={id}
                    screen={props.screen}
                    setScreen={props.setScreen}
                    workingThisDocument={workingThisDocument[index]}
                    setAsActive={() => setOnlyThisActive(index)}
                />
            ))}
        </>
    )
}

//פתיחה
//מחיקת מסך
//להוסיף למערך של אחרונים גם על איזה קובץ הוא עבד