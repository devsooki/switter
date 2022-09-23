import React, { useEffect, useState } from 'react';

// components
import AppRouter from 'components/Router';

// tool
import { authService } from 'fBase';
import { updateProfile } from 'firebase/auth';

// style
import GlobalStyle from 'style/GlobalStyle';

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    // user 정보의 변경이 있는지 체크
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true)
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: args => updateProfile(user, {displayName: user.displayName})
        })
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: args => updateProfile(user, {displayName: user.displayName})
    })
  }
  return  (
    <>
      <GlobalStyle />
      {init ? (
        <AppRouter 
          isLoggedIn={isLoggedIn} 
          userObj={userObj} 
          refreshUser={refreshUser}
        />
      ) : (
        'Initializing...'
      )}
    </>
  )
}

export default App;
