import { useState } from 'react'
import './App.css'
import Keyboard from "./components/Keyboard/Keyboard"
import User from './components/User/User'
import Button from './components/Button'
let lastScreens = []



function App() {
  const [screen, setScreen] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [whatLanguage, setWhatLanguage] = useState("english")
  const [workingThisDocument, setWorkingThisDocument] = useState([])


  return (
    <div className="main-workspace">
      <div className="document-item">
        <User screen={screen} setScreen={setScreen} userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}
          whatLanguage={whatLanguage} workingThisDocument={workingThisDocument} setWorkingThisDocument={setWorkingThisDocument}></User>
        {userLoggedIn && (
          <>
            <Keyboard setScreen={setScreen} screen={screen} lastScreens={lastScreens} whatLanguage={whatLanguage} setWhatLanguage={setWhatLanguage}
              workingThisDocument={workingThisDocument} setWorkingThisDocument={setWorkingThisDocument} />
            <div className="logout-container">
              <Button clickAct={() => { localStorage.setItem('currentUser', ''); setUserLoggedIn(false) }} target={'log out'}></Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}


export default App


