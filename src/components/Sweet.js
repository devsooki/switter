import React, { useState } from 'react'

// tool
import { dbService, storageService } from 'fBase'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

// style
import styled from 'styled-components'

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

  const toggleEditing = e => {
    e.preventDefault()

    setEditing(prev => !prev)
  }

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
    <Container>
      {
        editing ? (
          <EditSweetForm onSubmit={onSubmit}>
            <Input 
              type="text"
              placeholder="Edit your sweet"
              value={newSweet} 
              onChange={onChange}
              required 
              autoFocus
            />
            <input type="submit" value="Update Sweet" className="form-button form-input" />
            <button onClick={toggleEditing} className="form-button" >Cancle</button>
          </EditSweetForm>
        ) : (
          <SweetContainer>
            <SweetContent>
              <span>{sweetObj.text}</span>
              {isOwner && (
                <>
                  <button onClick={toggleEditing}>
                    <FontAwesomeIcon 
                      icon={faPencilAlt}
                      color={'#666'}
                    />
                  </button>
                  <button onClick={onClickDelete}>
                    <FontAwesomeIcon 
                      icon={faTrash} 
                      color={'#666'} 
                    />
                  </button>
                </>
              )}
            </SweetContent>
            {sweetObj.attachmentUrl && <img src={sweetObj.attachmentUrl} alt="sweet img" /> }
          </SweetContainer>
        )
      }
    </Container>
  )
}

export default Sweet

const Container = styled.div`
  margin: 0 0 20px;
  background-color: #fff;
`
const EditSweetForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px 0 0;

  .form-button {
    margin:  0 10px 10px;
    padding: 10px;
    color: #fff;
    background-color: tomato;
  }
  .form-input {
    background-color: #04aaff;
  }
`
const Input = styled.input`
  margin: 0 0 10px;
  padding: 10px;
`
const SweetContainer = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
  }
`
const SweetContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px;
  
  span {
    flex: 1;
    color: #666;
    word-break: break-all;
  }
  button {
    align-self: flex-start;
    background: none;
  }
`