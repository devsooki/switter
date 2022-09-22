import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

// tool
import { authService, dbService } from 'fBase'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory()
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

  const onClickLogOut = () => {
    authService.signOut()
    history.push('/')
  }

  const getMySweets = async () => {
    const q = query(collection(dbService, 'sweets'), where('creatorId', '==', userObj.uid))

  }

  const onChage = e => {
    const {
      target : { value }
    } = e

    setNewDisplayName(value)
  }
  const onSubmit = async (e) => {
    e.preventDefault()

    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {displayName: newDisplayName})
      refreshUser()
    }
  }

  useEffect(() => {
    getMySweets()
  }, [])
  return (
    <>
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="Display name" 
          value={newDisplayName}
          onChange={onChage}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onClickLogOut}>Log Out</button>
    </>
  )
}

export default Profile