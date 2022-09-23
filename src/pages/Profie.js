import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

// tool
import { authService, dbService } from 'fBase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import Sweet from 'components/Sweet'

const Profile = ({ userObj, refreshUser }) => {
  const history = useHistory()
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
  const [sweets, setSweets] = useState([])

  const onClickLogOut = () => {
    authService.signOut()
    history.push('/')
  }

  const getMySweets = async () => {
    const q = query(collection(dbService, 'sweets'), where('creatorId', '==', userObj.uid))
    onSnapshot(q, snapshot => {
      const sweetArr = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setSweets(sweetArr)
    })
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

      {sweets.map(sweet => (
        <Sweet
          key={sweet.id} 
          sweetObj={sweet} 
          isOwner={sweet.creatorId === userObj.uid}
        />
      ))}
    </>
  )
}

export default Profile