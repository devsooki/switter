import React, { useState } from 'react';

// tool
import { v4 as uuidv4 } from 'uuid'
import { dbService, storageService } from 'fBase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

// style
import styled from 'styled-components';

const SweetFactory = ({ userObj }) => {
  const [sweet, setSweet] = useState('')
  const [attachment, setAttachment] = useState('')

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
    <form onSubmit={onSubmit}>

      <TextInfo>
        {sweet.length} / 120
      </TextInfo>
      <InputContainer>
        <Input 
          value={sweet}
          onChange={onChange}
          type="text" 
          placeholder="What's on your mind?" 
          maxLength={120} 
        />
        <Input type="submit" value="Switte" />
      </InputContainer>
      {
        attachment && (
          <PreviewImageContainer>
            <img src={attachment} alt="sweet img" />
            <button onClick={onClearAttachment}>✖️</button>
          </PreviewImageContainer>
        )
      }
      <FileInputContainer>
        <label htmlFor="add_photo">Add Photo 📸</label>
        <Input id="add_photo" type="file" accept="image/*" onChange={onChangeFile} />
      </FileInputContainer>
    </form>
  )
}

export default SweetFactory

const TextInfo = styled.div`
  padding: 0 0 5px;
  font-size: 12px;
  text-align: right;
`
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 20px;
  border: 1px solid #04aaff;
`
const Input = styled.input`
  padding: 10px;

  &[type="text"] {
    flex: 1;
    color: #04aaff;
    background-color: #000;
  }
  &[type="submit"] {
    color: #fff;
    background-color: #04aaff;
  }
  &[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
  }
`
const PreviewImageContainer = styled.div`
  position: relative;

  img {
    width: 100%;
  }
  button {
    position: absolute;
    top: 7px; right: 5px;
    border: none;
    background: none;
    font-size: 20px;
  }
`
const FileInputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0 50px;

  label {
    color: #04aaff;
    cursor: pointer;
  }
`