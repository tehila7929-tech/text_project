import Button from "../Button"
import React, { useState } from 'react';


export default function LanguageKeys(props) {

    const [language, setLanguage] = useState("english")

    const english = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"
        , "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const uppercase = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const hebrew = [
        "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כ", "ך", "ל",
        "מ", "ם", "נ", "ן", "ס", "ע", "פ", "ף", "צ", "ץ", "ק", "ר", "ש", "ת"];
    const emojis = [
        "😀", "😁", "😂", "🤣", "🤠", "🤫", "😉", "😊", "😍", "😎",
        "🤩", "😐", "😴", "😛", "🤔", "😶", "🙃", "😬", "😱", "🫠",
        "👍", "👎", "👌", "🙏", "👏", "🙌", "🔥", "🎶", "⭐", "❤️"];
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const symbols = [
        ".", ",", "!", "?", ":", ";",
        "-", "_", "'", "\"",
        "(", ")", "[", "]", "{", "}",
        "+", "-", "*", "/", "=", "%",
        "@", "#", "$", "&", "|", "\\",
        "<", ">", "^", "~"];

    const emojisTarget = props.whatLanguage == "english" ? "emojis" : "אימוג'י"
    const digitsTarget = props.whatLanguage == "english" ? "digits" : "ספרות"
    const symbolsTarget = props.whatLanguage == "english" ? "symbols" : "סימנים"


    const changeLanguageKeys = [
        { clickAct: () => { setLanguage("hebrew"); props.setWhatLanguage("hebrew") }, target: "עברית" },
        { clickAct: () => { setLanguage("english"); props.setWhatLanguage("english") }, target: "english" },
        { clickAct: () => setLanguage("uppercase"), target: "uppercase" },
        { clickAct: () => setLanguage("emojis"), target: emojisTarget },
        { clickAct: () => setLanguage("digits"), target: digitsTarget },
        { clickAct: () => setLanguage("symbols"), target: symbolsTarget },

    ];

    const getLetters = () => {
        switch (language) {
            case "english":
                return english;
            case "uppercase":
                return uppercase;
            case "hebrew":
                return hebrew;
            case "emojis":
                return emojis;
            case "digits":
                return digits;
            case "symbols":
                return symbols;
            default:
                return [];
        }
    };
    const lettersArr = getLetters();
    let styleNow
    return (
        <>

            <div>
                {changeLanguageKeys.map((element, index) => (
                    <Button key={index} clickAct={element.clickAct} target={element.target} />
                ))
                }
            </div>

            <div>
                {lettersArr.map((letter, index) => (
                    <Button key={index} target={letter} clickAct={() => {
                        props.lastScreens.push({ style: props.style, screen: [...props.screen], workingThisDocument: [...props.workingThisDocument] });
                        styleNow = props.style;
                        props.setScreen(prevScreen => [...prevScreen, { ch: letter, style: styleNow }])
                    }} />
                ))}
            </div>

        </>
    )
}