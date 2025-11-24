import { useState } from 'react'
import './App.css'
import Keyboard from "./components/Keyboard/Keyboard"
import DocumentEditor from "./components/DocumentEditor/DocumentEditor"
import User from './components/User/User'
let lastScreens = []


import Document from "./components/DocumentEditor/Document/Document"

function App() {
  const [screen, setScreen] = useState([]);
  return (
    <div className="main-workspace">
      <div className="document-item">
        <User screen={screen} setScreen={setScreen}></User>
        {/* <Document screen={screen} setScreen={setScreen} /> */}
        <Keyboard setScreen={setScreen} screen={screen} lastScreens={lastScreens} />
      </div>
    </div>
  )
}

export default App
