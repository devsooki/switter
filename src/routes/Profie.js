import React from 'react'
import { authService } from 'fBase'
import { useHistory } from 'react-router-dom'

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