import { useState, useEffect } from "react";
import LanguageKeys from "./LanguageKeys/LanguageKeys"
import DesignKeys from "./DesignKeys/DesignKeys";
import ActionKeys from "./ActionKeys/ActionKeys";
import "./Keyboard.css";


export default function Keyboard(props) {

    const [whatLanguage, setWhatLanguage] = useState("english")
    const [style, setStyle] = useState({ color: "#000000", fontFamily: "Arial", fontSize: "16px" })

    useEffect(() => {
        document.body.dir = whatLanguage === "english" ? "ltr" : "rtl";
    }, [whatLanguage])

    return (
        <div className="keyboard-main">
            <LanguageKeys setScreen={props.setScreen} setWhatLanguage={setWhatLanguage} setStyle={setStyle} whatLanguage={whatLanguage} style={style} lastScreens={props.lastScreens} screen={props.screen} />
            <ActionKeys setScreen={props.setScreen} whatLanguage={whatLanguage} style={style} setStyle={setStyle} screen={props.screen} lastScreens={props.lastScreens} />
            <DesignKeys setScreen={props.setScreen} whatLanguage={whatLanguage} setStyle={setStyle} screen={props.screen} lastScreens={props.lastScreens} />
        </div>
    )
}
