import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

// tool
import { authService, dbService } from 'fBase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'
import Sweet from 'components/Sweet'
import styled from 'styled-components'

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
      try {
        await updateProfile(authService.currentUser, {displayName: newDisplayName})
        refreshUser()
        
      } catch (error) {
        console.log(error)
      } finally {
        alert('프로필이 수정되었습니다!')
      }
    }
  }

  useEffect(() => {
    getMySweets()
  }, [])

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="Display name" 
          value={newDisplayName}
          onChange={onChage}
        />
        <input type="submit" value="Update Profile" />
      </Form>

      {sweets.map(sweet => (
        <Sweet
          key={sweet.id} 
          sweetObj={sweet} 
          isOwner={sweet.creatorId === userObj.uid}
        />
      ))}

      <Button onClick={onClickLogOut}>Log Out</Button>
    </Container>
  )
}

export default Profile

const Container = styled.div`
  width: 350px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #f2f2f2;

  input[type="text"] {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #fff;
  }

  input[type="submit"] {
    padding: 10px;
    color: #fff;
    background-color: #04aaff;
  }
`
const Button = styled.button`
  padding: 10px;
  margin: 10px 0 0;
  width: 100%;
  color: #fff;
  background-color: tomato;
`