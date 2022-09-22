import React, { useEffect, useState } from 'react'

// component
import Sweet from 'components/Sweet'
import SweetFactory from 'components/SweetFactory'

// tool
import { dbService } from 'fBase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

const Home = ({ userObj }) => {
  const [sweets, setSweets] = useState([])

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

  // const getSweets = async () => {
  //   const dbSweets = query(collection(dbService, 'sweets'))
  //   const dbSweetsSnapshot = await getDocs(dbSweets)
    
  //   dbSweetsSnapshot.forEach(document => {
  //     const sweetObj = {
  //       ...document.data(),
  //       id: document.id
  //     }
  //     setSweets(prev => [sweetObj, ...prev])
  //   })
  // }

  return (
    <div>
      <SweetFactory userObj={userObj}/>
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