import React from 'react'
import { useHistory } from 'react-router-dom'

// tool
import { authService } from 'fBase'

const Profile = () => {
  const hisory = useHistory()
  const onClickLogOut = () => authService.signOut()
  return (
    <>
      <button onClick={onClickLogOut}>Log Out</button>
    </>
  )
}

export default Profile