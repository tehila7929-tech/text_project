import './Screen.css'



export default function Screen(props) {
    return (
        <div id='screen'>
            {props.workingThisDocument ?
                <div>
                    {props.screen.map((element, index) => {
                        const isHebrew = element.ch.match(/[\u0590-\u05FF]/);
                        const textStyle = isHebrew ? { direction: 'rtl', display: 'inline' } : { direction: 'ltr', display: 'inline' };
                        return (element.ch === "/n" ? <br key={index} ></br> :
                            <span key={index} style={{ ...element.style, ...textStyle }}>  {element.ch === ' ' ? <span>&nbsp;</span> : element.ch} </span>);
                    })}</div>
                : <div> {props.thisFile.screen.map((element, index) => {
                    const isHebrew = element.ch.match(/[\u0590-\u05FF]/);
                    const textStyle = isHebrew ? { direction: 'rtl', display: 'inline' } : { direction: 'ltr', display: 'inline' };
                    return (element.ch === "/n" ? <br key={index} ></br> :
                        <span key={index} style={{ ...element.style, ...textStyle }}>  {element.ch === ' ' ? <span>&nbsp;</span> : element.ch} </span>);
                })}</div>
            }

        </div>
    );
}

