import { useState } from "react";
import Button from "../Button";

export default function DesignKeys(props) {

    const [divChoosingDesignStyle, setDivChoosingDesignStyle] = useState(<></>);

    function chooseDesignDiv(style, source = "") {
        const colors = props.whatLanguage == "english" ? ["black", "green", "red", "pink", "blue"]
            : ["שחור", "ירוק", "אדום", "ורוד", "כחול"]
        const colorsRBG = ["#000000", "#008000", "#FF0000", "#ff0090ff", "#0000FF"]
        const fonts = ["Arial", "Helvetica", "Verdana", "Tahoma"];
        const fontSizes = ["12px", "16px", "20px", "24px"];
        let options
        if (style == "color") {
            options = colors.map((element, index) => (
                <Button key={index} clickAct={source == "" ? () => changeColor(colorsRBG[index]) :
                    () => changeAllColor(colorsRBG[index])} target={element} />
            ))
        } else if (style == "font") {
            options = fonts.map((element, index) => (
                <Button key={index} clickAct={source == "" ? () => changeFonts(element) :
                    () => changeAllFonts(element)} target={element} />
            ))
        } else {
            options = fontSizes.map((element, index) => (
                <Button key={index} clickAct={source == "" ? () => changeFontSizes(element) :
                    () => changeAllFontSizes(element)} target={element} />
            ))
        }
        setDivChoosingDesignStyle(options)
    }

    function changeColor(color) {
        props.setStyle(prevStyle => ({ ...prevStyle, color: color }))
        setDivChoosingDesignStyle(<></>)
    }

    function changeFonts(font) {
        props.setStyle(prevStyle => ({ ...prevStyle, fontFamily: font }))
        setDivChoosingDesignStyle(<></>)
    }

    function changeFontSizes(fontSize) {
        props.setStyle(prevStyle => ({ ...prevStyle, fontSize: fontSize }))
        setDivChoosingDesignStyle(<></>)
    }

    function changeAllColor(color) {
        props.lastScreens.push({ style: props.style, screen: [...props.screen], workingThisDocument: [...props.workingThisDocument] });
        props.setScreen(prevScreen => prevScreen.map(element => {
            return { ...element, style: { ...element.style, color: color } };
        }));
        changeColor(color)
    }

    function changeAllFonts(font) {
        props.lastScreens.push({ style: props.style, screen: [...props.screen], workingThisDocument: [...props.workingThisDocument] });
        props.setScreen(prevScreen => prevScreen.map(element => {
            return { ...element, style: { ...element.style, fontFamily: font } };
        }));
        changeFonts(font)
    }

    function changeAllFontSizes(fontSize) {
        props.lastScreens.push({ style: props.style, screen: [...props.screen], workingThisDocument: [...props.workingThisDocument] });
        props.setScreen(prevScreen => prevScreen.map(element => {
            return { ...element, style: { ...element.style, fontSize: fontSize } };
        }));
        changeFontSizes(fontSize)
    }

    let changeColorTarget = props.whatLanguage == "english" ? "change color" : "שינוי צבע"
    let changeFontTarget = props.whatLanguage == "english" ? "change font" : "שינוי פונט"
    let changeSizeTarget = props.whatLanguage == "english" ? "change size" : "שינוי גודל"
    let changeAllColorTarget = props.whatLanguage == "english" ? "change color of all the text" : "שינוי צבע לכל הטקסט"
    let changeAllFontTarget = props.whatLanguage == "english" ? "change font of all the text" : "שינוי פונט לכל הטקסט"
    let changeAllSizeTarget = props.whatLanguage == "english" ? "change size of all the text" : "שינוי גודל לכל הטקסט"

    const design = [
        { clickAct: () => chooseDesignDiv("color"), target: changeColorTarget },
        { clickAct: () => chooseDesignDiv("font"), target: changeFontTarget },
        { clickAct: () => chooseDesignDiv("size"), target: changeSizeTarget },
    ];

    const designAll = [
        { clickAct: () => chooseDesignDiv("color", "all"), target: changeAllColorTarget },
        { clickAct: () => chooseDesignDiv("font", "all"), target: changeAllFontTarget },
        { clickAct: () => chooseDesignDiv("size", "all"), target: changeAllSizeTarget },
    ];
    
    return (<div>

        {design.map((element, index) => (
            <Button key={index} clickAct={element.clickAct} target={element.target} />
        ))}
        {designAll.map((element, index) => (
            <Button key={index} clickAct={element.clickAct} target={element.target} />
        ))}
        <div >{divChoosingDesignStyle}</div>

    </div>)

}



