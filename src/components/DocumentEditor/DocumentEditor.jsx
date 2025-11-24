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
            {screenIds.map((id, index) => (
                < Document
                    key={id}
                    screen={props.screen}
                    setScreen={props.setScreen}
                    workingThisDocument={workingThisDocument[index]}
                    // setWorkingThisDocument={(val) => updateStatus(index, val)}
                    // updateAllStatus={updateAllStatus}
                    setAsActive={() => setOnlyThisActive(index)}
                />
            ))}
            <Button clickAct={() => { newScreen() }} target="Open a new editing screen" />
        </>
    )
}





//יהיה מערך שיעבור על כל המסכים וכל פעם שלוחצים על "לעבוד על מסך זה"
//יצטרכו לבדוק אצך מי הוא כרגע ולעדכן את thisFile.screen שלו ל props.screen ורק אז לשנות.