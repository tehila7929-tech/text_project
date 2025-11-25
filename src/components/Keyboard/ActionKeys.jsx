import Button from "../Button"
import { useState } from "react";


export default function ActionKeys(props) {
    const [inputBoxes, setinputBoxes] = useState(<></>)

    const delTarget = props.whatLanguage == "english" ? "del" : "מחק"
    const delWordTarget = props.whatLanguage == "english" ? "del word" : "מחק מילה"
    const delAllTarget = props.whatLanguage == "english" ? "del all" : "מחק תוכן"
    const spaceTarget = props.whatLanguage == "english" ? "space" : "רווח"
    const searchTarget = props.whatLanguage === "english" ? "search" : "חפש";
    const replaceTarget = props.whatLanguage === "english" ? "Character replacement" : "החלפת תו";
    const makeReplaceTarget = props.whatLanguage === "english" ? "replace" : "החלף";
    const undo = props.whatLanguage === "english" ? "undo last action ↶" : "ביטול פעולה אחרונה ↶";

    let styleNow

    const actionKeys = [
        {
            clickAct: () => {
                props.lastScreens.push({ style: props.style, screen: [...props.screen], workingThisDocument: [...props.workingThisDocument] });
                props.setScreen(prevScreen => prevScreen.slice(0, -1))
            }, target: delTarget
        },
        {
            clickAct: () => {
                props.lastScreens.push({ style: props.style, screen: [...props.screen], workingThisDocument: [...props.workingThisDocument] });
                let lastSpace = lastSpaceIndex(props.screen)
                if (lastSpace == -1)
                    props.setScreen([])
                else
                    props.setScreen(prevScreen => prevScreen.slice(0, lastSpace))
            }, target: delWordTarget
        },
        {
            clickAct: () => {
                props.lastScreens.push({ style: props.style, screen: [...props.screen], workingThisDocument: [...props.workingThisDocument] });
                props.setScreen([])
            }, target: delAllTarget
        },
        {
            clickAct: () => {
                props.lastScreens.push({ style: props.style, screen: [...props.screen], workingThisDocument: [...props.workingThisDocument] });
                styleNow = props.style;
                props.setScreen(prevScreen => [...prevScreen, { ch: " ", style: styleNow }])
            }, target: spaceTarget, isSpace: true
        },
        { clickAct: searcInput, target: searchTarget },
        { clickAct: replaceInput, target: replaceTarget },
        {
            clickAct: () => {
                props.lastScreens.push({ style: props.style, screen: [...props.screen], workingThisDocument: [...props.workingThisDocument] });
                styleNow = props.style;
                props.setScreen(prevScreen => [...prevScreen, { ch: " ", style: styleNow }, { ch: "/n", style: styleNow }])
            },
            target: "⏎"
        },
        {
            clickAct: () => {
                if (props.lastScreens.length > 0) {
                    props.setScreen(props.lastScreens[props.lastScreens.length - 1].screen);
                    props.setStyle(props.lastScreens[props.lastScreens.length - 1].style);
                    props.setWorkingThisDocument(props.lastScreens[props.lastScreens.length - 1].workingThisDocument)
                    props.lastScreens.pop();
                }
            },
            target: undo
        }

    ]

    function searcInput() {
        {
            const searchElements = <div className="actInput">
                <input
                    type="text"
                    onChange={(event) => search(event.target.value)}
                    placeholder={props.whatLanguage === "english" ? "Enter search term" : "הזן מונח לחיפוש"}
                />
                <Button clickAct={() => {
                    setinputBoxes(<></>)
                    const withoutHighlight = props.screen.map(char => {
                        return { ...char, style: { ...char.style, backgroundColor: 'white' } };
                    })
                    props.setScreen(withoutHighlight);
                }} target={"❌"} />
            </div>
            setinputBoxes(searchElements)
        }
    }

    function search(searchTerm) {
        const highlightedScreen = props.screen.map(char => {
            if (char.ch === searchTerm) {
                return { ...char, style: { backgroundColor: 'lightblue' } };
            }
            return char;
        });
        props.setScreen(highlightedScreen);
    }
    
    function replaceInput() {
        {
            let sourceChar
            let destinationChar
            const searchElements = <div className="actInput">
                <input
                    type="text"
                    onChange={(event) => sourceChar = event.target.value}
                    placeholder={props.whatLanguage === "english" ? "replace the" : "החלף את:"}
                />
                <input
                    type="text"
                    onChange={(event) => destinationChar = event.target.value.charAt(0)}
                    placeholder={props.whatLanguage === "english" ? "replace to" : "החלף ב:"}
                />
                <Button clickAct={() => replace(sourceChar, destinationChar)} target={makeReplaceTarget} />
            </div >
            setinputBoxes(searchElements)
        }
    }

    function replace(sourceChar, destinationChar) {
        const replacedText = props.screen.map(char => {
            if (char.ch === sourceChar) {
                return { ...char, ch: destinationChar };
            }
            return char;
        });
        props.lastScreens.push({ style: props.style, screen: [...props.screen] });
        props.setScreen(replacedText);
        setinputBoxes(<></>)
    }

    const lastSpaceIndex = (prevScreen) => {
        let lastIndex = -1;
        for (let i = prevScreen.length - 1; i >= 0; i--) {
            if (prevScreen[i].ch === ' ') {
                lastIndex = i;
                break;
            }
        }
        return lastIndex;
    }

    return (
        <div className="key-section">
            {actionKeys.map((element, index) => (
                element.isSpace ?
                    <button key={index} data-space="true" onClick={element.clickAct}>{element.target}</button>
                    : <Button key={index} clickAct={element.clickAct} target={element.target} />
            ))
            }
            {inputBoxes}
        </div>
    )
}


