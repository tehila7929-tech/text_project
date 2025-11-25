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

  const setOnlyThisActive = (indexToActivate) => {
    setWorkingThisDocument(prevDocs => {
      return prevDocs.map((_, index) => {
        return index === indexToActivate;
      });
    });
  };

  return (
    <div className="main-workspace">
      <div className="document-item">
        <User screen={screen} setScreen={setScreen} userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}
          whatLanguage={whatLanguage} workingThisDocument={workingThisDocument} setWorkingThisDocument={setWorkingThisDocument}
          setOnlyThisActive={setOnlyThisActive}></User>
        {userLoggedIn && (
          <>
            <Keyboard setScreen={setScreen} screen={screen} lastScreens={lastScreens} whatLanguage={whatLanguage} setWhatLanguage={setWhatLanguage} />
            <Button clickAct={() => { localStorage.setItem('currentUser', ''); setUserLoggedIn(false) }} target={'log out'}></Button>
          </>
        )}
      </div>
    </div>
  )
}


export default App


