import { useState } from 'react'
import './App.css'
import Keyboard from "./components/Keyboard/Keyboard"
import User from './components/User/User'
import Button from './components/Button'
let lastScreens = []



function App() {
  const [screen, setScreen] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false)////לשאול את תהילה
  return (
    <div className="main-workspace">
      <div className="document-item">
        <User screen={screen} setScreen={setScreen} userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}></User>
        {userLoggedIn&&<Keyboard setScreen={setScreen} screen={screen} lastScreens={lastScreens} />&&
        <Button clickAct={()=>{localStorage.setItem('currentUser', '');setUserLoggedIn(false) }}></Button>}
      </div>
    </div>
  )
}

export default App
