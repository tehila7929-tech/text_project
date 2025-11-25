import { useState, useEffect } from "react";
import Button from "../../Button"

if (!localStorage.getItem('currentUser')) {
    localStorage.setItem('currentUser', JSON.stringify([]));
}

export default function Files(props) {
    const [divIputs, setDivIputs] = useState(<></>)
    const currentUser = localStorage.getItem('currentUser')
    
    function save() {
        const contentToSave = props.workingThisDocument ? props.screen : props.thisFile.screen;
        workingThisDocument();
        if (props.thisFile.name === "Unnamed" || !props.thisFile.name) {
            saveAs();
            return;
        }
        let currentUserFiles = JSON.parse(localStorage.getItem(currentUser)) || [];
        let found = false;
        const updatedFiles = currentUserFiles.map(file => {
            if (file.name === props.thisFile.name) {
                found = true;
                return { ...file, screen: contentToSave };
            }
            return file;
        });
        if (found) {
            localStorage.setItem(currentUser, JSON.stringify(updatedFiles));
            props.setThisFile(prev => ({ ...prev, screen: contentToSave }));
            alert(props.whatLanguage === "english" ? "Saved!" : "נשמר!");
        } else {
            saveAs();
        }
    }

    function saveAs() {
        const newName = prompt(props.whatLanguage === "english" ? "Enter file name" : "הזן שם קובץ");
        if (newName) {
            const newFile = { name: newName, screen: props.screen };
            let currentUserFiles = JSON.parse(localStorage.getItem(currentUser)) || [];
            currentUserFiles.push(newFile);
            localStorage.setItem(currentUser, JSON.stringify(currentUserFiles));
            props.setThisFile(newFile);
        }
    }


    function openFile() {
        const rawData = localStorage.getItem(currentUser);
        if (!rawData) {
            const noFilesMessage = props.whatLanguage === "english" ? "No saved files found" : "לא נמצאו קבצים שמורים";
            setDivIputs(
                <div> <strong>{noFilesMessage}</strong>
                    <Button clickAct={() => setDivIputs(<></>)} target={"❌"} /> </div>
            );
            return;
        }
        let files = JSON.parse(rawData);
        const filesButtons = files.map((file, index) => {
            return (
                <Button key={index} target={file.name} clickAct={() => {
                    props.setAsActive(); props.setThisFile(file); setDivIputs(<></>);
                }}
                />
            )
        });
        const cancelTarget = props.whatLanguage === "english" ? "Cancel" : "ביטול";
        const titleTarget = props.whatLanguage === "english" ? "Select a file:" : "בחר קובץ:";
        setDivIputs(
            <div>
                <strong>{titleTarget}</strong>
                <div>
                    {filesButtons.length > 0 ? filesButtons : "ריק"}
                </div>
                <hr />
                <Button clickAct={() => setDivIputs(<></>)} target={cancelTarget} />
            </div>
        )
    }

    function workingThisDocument() {
        props.setAsActive()
    }

    useEffect(() => {
        if (props.workingThisDocument && props.thisFile.screen) {
            props.setScreen(props.thisFile.screen)
        }
    }, [props.workingThisDocument, props.thisFile])

    useEffect(() => {
        if (props.workingThisDocument) {
            props.thisFile.screen = props.screen
        }
    }, [props.screen])

    const saveTarget = props.whatLanguage == "english" ? "save" : "שמור"
    const saveASTarget = props.whatLanguage == "english" ? "save as" : "שמור ב"
    const workingTarget = props.whatLanguage == "english" ? "working on this file" : "עבוד על קובץ זה"
    const openingTarget = props.whatLanguage == "english" ? "opening another file" : "פתיחת קובץ אחר"

    return (
        <>
            <Button clickAct={() => { save() }} target={saveTarget} />
            <Button clickAct={saveAs} target={saveASTarget} />
            <Button clickAct={workingThisDocument} target={workingTarget} />
            <Button clickAct={openFile} target={openingTarget} />
            {divIputs}
        </>
    )
}


