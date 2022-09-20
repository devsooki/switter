import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fBase';

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // user 정보의 변경이 있는지 체크
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return  (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Switter</footer>
    </>
  )
}

export default App;
