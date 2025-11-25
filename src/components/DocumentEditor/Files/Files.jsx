import { useState, useEffect } from "react";
import Button from "../../Button"

if (!localStorage.getItem('currentUser')) {
    localStorage.setItem('currentUser', JSON.stringify([{ name: 'ab', screen: [] }]));
}

let fileName

export default function Files(props) {
    const [divIputs, setDivIputs] = useState(<></>)

    function saveAs() {
        fileName = prompt("הזן שם קובץ");
        if (fileName) {
            props.setThisFile({ name: fileName, screen: props.thisFile.screen });
            save(fileName)
        }
    }

    function save(fileName = null) {
        workingThisDocument()
        let currentUserFiles = JSON.parse(localStorage.getItem('currentUser'));
        let isNew = true
        if (fileName == null) {
            let afterSave = currentUserFiles.map(file => {
                if (file.name === fileName) {
                    props.setThisFile({ name: "no file", screen: props.screen })
                    file.screen = props.screen;
                    isNew = false;
                }
                return file;
            });
            if (isNew) {
                saveAs()
                return
            }
            localStorage.setItem('currentUser', JSON.stringify(afterSave))
        }
        else {
            props.setThisFile({ name: fileName, screen: props.screen })
            console.log([...currentUserFiles, { name: fileName, screen: props.screen }]);
            localStorage.setItem('currentUser', JSON.stringify([...currentUserFiles, { name: fileName, screen: props.screen }]))
            console.log(JSON.parse(localStorage.getItem('currentUser')))

        }
    }

    function openFile() {
        setDivIputs(JSON.parse(localStorage.getItem('currentUser')).map((element, index) => {
            return <Button key={index} clickAct={() => { props.setThisFile(element); setDivIputs(<></>) }} target={element.name} />
        }))
    }

    function workingThisDocument() {
        props.setAsActive()
    }

    useEffect(() => {
        if (props.workingThisDocument) {
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
            <Button clickAct={() => { save(null) }} target={saveTarget} />
            <Button clickAct={saveAs} target={saveASTarget} />
            <Button clickAct={workingThisDocument} target={workingTarget} />
            <Button clickAct={openFile} target={openingTarget} />
            {divIputs}
        </>
    )
}




