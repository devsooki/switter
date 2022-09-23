import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

// component
import Navigation from 'components/Navigation'
import Home from 'pages/Home'
import Auth from 'pages/Auth'
import Profile from 'pages/Profie'

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} /> }
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile 
                userObj={userObj} 
                refreshUser={refreshUser} 
              />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  )
}

export default AppRouter