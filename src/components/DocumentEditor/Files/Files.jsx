import { useState } from "react";
import Button from "../../Button"
import Screen from "../Screen/Screen"

if (!localStorage.getItem('currentUser')) {
    localStorage.setItem('currentUser', JSON.stringify([{ name: 'ab', screen: [] }]));
}
let fileName

export default function Files(props) {
    const [thisFile, setThisFile] = useState({ name: "no file", screen: [] })
    const [divIputs, setDivIputs] = useState(<></>)

    function saveAs() {
        fileName = prompt("הזן שם קובץ");
        if (fileName) {
            setThisFile({ name: fileName, screen: thisFile.screen });
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
                    setThisFile({ name: "no file", screen: props.screen })
                    file.screen = props.screen;
                    isNew = false;
                }
                return file;
            });
            if (isNew) {
                saveAs()
            }
            localStorage.setItem('currentUser', JSON.stringify(afterSave))
        }
        else {
            setThisFile({ name: fileName, screen: props.screen })
            console.log([...currentUserFiles, { name: fileName, screen: props.screen }]);
            localStorage.setItem('currentUser', JSON.stringify([...currentUserFiles, { name: fileName, screen: props.screen }]))
            console.log(JSON.parse(localStorage.getItem('currentUser')))

        }
    }

    function openFile() {
        setDivIputs(JSON.parse(localStorage.getItem('currentUser')).map((element, index) => {
            return <Button key={index} clickAct={() => { setThisFile(element); setDivIputs(<></>) }} target={element.name} />
        }))
    }

    function workingThisDocument() {
        // props.setScreen(thisFile.screen);
        // props.updateAllStatus()
        // props.setWorkingThisDocument(true);
        props.setAsActive()
    }

    return (
        <>
            <Button clickAct={() => { save(null) }} target="save" />
            <Button clickAct={saveAs} target="save as" />
            <Button clickAct={workingThisDocument} target="working on this file" />
            <Button clickAct={openFile} target="opening another file" />
            {divIputs}
        </>
    )
}




