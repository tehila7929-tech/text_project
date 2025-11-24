export default function Button(props) {
    return (
        <>
            <button onClick={props.clickAct}>{props.target}</button>
        </>
    )
}