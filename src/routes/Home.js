import { dbService } from 'fBase'
import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'

const Home = () => {
  const [sweet, setSweet] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    await addDoc(collection(dbService, 'sweets'), {
      sweet,
      createdAt: Date.now()
    })
    setSweet('')
  }
  const onChange = e => {
    const {
      target: {value}
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
    </div>
  )
}

export default Home