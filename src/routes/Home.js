import Sweet from 'components/Sweet'
import { dbService, storageService } from 'fBase'
import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

const Home = ({ userObj }) => {
  const [sweet, setSweet] = useState('')
  const [sweets, setSweets] = useState([])
  const [attachment, setAttachment] = useState('')

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

    let attachmentUrl = ''

    if (attachment !== '') {
      // 1. 사진 업로드
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
      const response = await uploadString(attachmentRef, attachment, "data_url")
      attachmentUrl = await getDownloadURL(response.ref)
    }

    // sweet에 올라갈 obj 생성
    const sweetObj = {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl
    }

    // 2. sweet 업로드
    await addDoc(collection(dbService, 'sweets'), sweetObj)
    setSweet('')
    setAttachment('')
  }
  const onChange = e => {
    const {
      target: { value }
    } = e

    setSweet(value)
  }

  const onChangeFile = e => {
    const {
      target: { files }
    } = e

    const theFile = files[0]
    const reader = new FileReader()
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result }
      } = finishedEvent

      setAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }
  const onClearAttachment = () => {
    setAttachment('')
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
        <input type="file" accept="image/*" onChange={onChangeFile} />
        <input type="submit" value="Switte" />
        {
          attachment && (
            <div>
              <img src={attachment} width="50" height="50px" alt="sweet img" />
              <button onClick={onClearAttachment}>Clear</button>
            </div>
          )
        }
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