import React, { useState } from 'react'

// tool
import { dbService, storageService } from 'fBase'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'

const Sweet = ({ sweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false)
  const [newSweet, setNewSweet] = useState(sweetObj.text)

  const sweetTextRef = doc(dbService, 'sweets', sweetObj.id)

  const onClickDelete = async () => {
    const ok = window.confirm('Are yor sure you want to delete this sweet?')

    if (ok) {
      // delete sweet
      await deleteDoc(sweetTextRef)

      if (sweetObj.attachmentUrl !== '') {
        await deleteObject(ref(storageService, sweetObj.attachmentUrl))
      }
    }
  }

  const toggleEditing = () => setEditing(prev => !prev)

  const onSubmit = async (e) => {
    e.preventDefault()

    await updateDoc(sweetTextRef, {
      text: newSweet
    })
    setEditing(false)
  }

  const onChange = e => {
    const {
      target: { value }
    } = e

    setNewSweet(value)
  }
  
  return (
    <div>
      {
        editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input 
                type="text"
                placeholder="Edit your sweet"
                value={newSweet} 
                onChange={onChange}
                required 
              />
              <input type="submit" value="Update Sweet" />
            </form>
            <button onClick={toggleEditing}>Cancle</button>
          </>
        ) : (
          <>
            <h4>{sweetObj.text}</h4>
            {sweetObj.attachmentUrl && <img src={sweetObj.attachmentUrl} width="50px" height="50px" alt="sweet img" /> }
            {
              isOwner && (
                <>
                  <button onClick={onClickDelete}>Delete Sweet</button>
                  <button onClick={toggleEditing}>Edit Sweet</button>
                </>
              )
            }
          </>
        )
      }
    </div>
  )
}

export default Sweet