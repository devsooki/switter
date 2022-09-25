import React, { useState } from 'react';

// tool
import { authService } from 'fBase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// style
import styled from 'styled-components';

const AuthForm = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

  const onChange = e => {
    const { 
      target: {name, value} 
    } = e

    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      let data;

      if (newAccount) {
        data = await createUserWithEmailAndPassword(authService, email, password)
      } else {
        data = await signInWithEmailAndPassword(authService, email, password)
      }
      
    } catch (error) {
      setError(error.message.replace("Firebase:", ""))
    }
  }

  const toggleAccount = () => setNewAccount(prev => !prev)

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input 
          name="email"
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={onChange}
          required 
        />
        <Input 
          name="password"
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={onChange}
          required 
        />
        <Input type="submit" value={newAccount ? 'Create Account' : 'Sign In'} />
        {error !== '' && <span>{error}</span>}
      </Form>
      <LoginText onClick={toggleAccount}>
        {newAccount ? 'Log in' : 'Create Account'} 
      </LoginText>
    </>
  )
}

export default AuthForm

const Form = styled.form`
  margin: 30px 0 0;

  span {
    color: tomato;
    font-size: 12px;
  }
`
const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  border: 0;

  &[type="submit"] {
    margin-bottom: 5px;
    color: #fff;
    background-color: #04AAFF;
  }
`
const LoginText = styled.span`
  margin: 5px 0 30px;
  color: #04AAFF;
  text-align: center;
  cursor: pointer;
`