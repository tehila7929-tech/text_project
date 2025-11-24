import { useState, useEffect } from "react";
import LanguageKeys from "./LanguageKeys/LanguageKeys"
import DesignKeys from "./DesignKeys/DesignKeys";
import ActionKeys from "./ActionKeys/ActionKeys";
import "./Keyboard.css";


export default function Keyboard(props) {

    const [style, setStyle] = useState({ color: "#000000", fontFamily: "Arial", fontSize: "16px" })

    useEffect(() => {
        document.body.dir = props.whatLanguage === "english" ? "ltr" : "rtl";
    }, [props.whatLanguage])

    return (
        <div className="keyboard-main">
            <LanguageKeys setScreen={props.setScreen} setWhatLanguage={props.setWhatLanguage} setStyle={setStyle} whatLanguage={props.whatLanguage} style={style} lastScreens={props.lastScreens} screen={props.screen} />
            <ActionKeys setScreen={props.setScreen} whatLanguage={props.whatLanguage} style={style} setStyle={setStyle} screen={props.screen} lastScreens={props.lastScreens} />
            <DesignKeys setScreen={props.setScreen} whatLanguage={props.whatLanguage} setStyle={setStyle} screen={props.screen} lastScreens={props.lastScreens} />
        </div>
    )
}
