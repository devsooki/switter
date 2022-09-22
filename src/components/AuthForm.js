import React, { useState } from 'react';

// tool
import { authService } from 'fBase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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
      <form onSubmit={onSubmit}>
        <input 
          name="email"
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={onChange}
          required 
        />
        <input 
          name="password"
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={onChange}
          required 
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Sign In'} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Log in' : 'Create Account'} 
      </span>
    </>
  )
}

export default AuthForm