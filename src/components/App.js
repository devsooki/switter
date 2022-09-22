import React, { useEffect, useState } from 'react';

// components
import AppRouter from 'components/Router';

// tool
import { authService } from 'fBase';

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    // user 정보의 변경이 있는지 체크
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return  (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        'Initializing...'
      )}
      <footer>&copy; {new Date().getFullYear()} Switter</footer>
    </>
  )
}

export default App;
