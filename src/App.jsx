import { useState } from 'react'
import './App.css'
import Keyboard from "./components/Keyboard/Keyboard"
import User from './components/User/User'
import Button from './components/Button'
let lastScreens = []



function App() {
  const [screen, setScreen] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(true)
  const [whatLanguage, setWhatLanguage] = useState("english")
  return (
    <div className="main-workspace">
      <div className="document-item">
        <User screen={screen} setScreen={setScreen} userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}></User>
        {userLoggedIn && (
          <>
            <Keyboard setScreen={setScreen} screen={screen} lastScreens={lastScreens} whatLanguage={whatLanguage} setWhatLanguage={setWhatLanguage} />
            <Button clickAct={() => { localStorage.setItem('currentUser', ''); setUserLoggedIn(false) }}></Button>
          </>
        )}
      </div>
    </div>
  )
}


export default App
