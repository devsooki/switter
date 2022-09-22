import Sweet from 'components/Sweet'
import { dbService } from 'fBase'
import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState('')
  const [sweets, setSweets] = useState([])

  const getSweets = async () => {
    const dbSweets = query(collection(dbService, 'sweets'))
    const dbSweetsSnapshot = await getDocs(dbSweets)
    
    dbSweetsSnapshot.forEach(document => {
      const sweetObj = {
        ...document.data(),
        id: document.id
      }
      setSweets(prev => [sweetObj, ...prev])
    })
  }

  useEffect(()=>{
    //getSweets()

    const q = query(collection(dbService, 'sweets'), orderBy('createdAt', 'desc'))

    onSnapshot(q, snapshot => {
      const sweetArr = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setSweets(sweetArr)
    })
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    await addDoc(collection(dbService, 'sweets'), {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid
    })
    setSweet('')
  }
  const onChange = e => {
    const {
      target: { value }
    } = e

    setSweet(value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          value={sweet}
          onChange={onChange}
          type="text" 
          placeholder="What's on your mind?" 
          maxLength={120} 
        />
        <input type="submit" value="Switte" />
      </form>
      <div>
        {sweets.map(sweet => (
          <Sweet 
            key={sweet.id} 
            sweetObj={sweet} 
            isOwner={sweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  )
}

export default Home