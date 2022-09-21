import React, { useState } from 'react'

// tool
import { authService } from 'fBase'
import { 
  createUserWithEmailAndPassword, 
  GithubAuthProvider, GoogleAuthProvider, 
  signInWithEmailAndPassword, signInWithPopup 
} from 'firebase/auth'

const Auth = () => {
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
      console.log(data)
      
    } catch (error) {
      setError(error.message.replace("Firebase:", ""))
    }
  }

  const toggleAccount = () => setNewAccount(prev => !prev)
  const onClickSocial = async (e) => {
    const {
      target: { name }
    } = e

    let provider;

    if (name === 'google') {
      //provider = new firebaseInstance.auth.GoogleAuthProvider()
      provider = new GoogleAuthProvider()
    } else if (name === 'github') {
      //provider = new firebaseInstance.auth.GithubAuthProvider()
      provider = new GithubAuthProvider()
    }

    await signInWithPopup(authService, provider)
  }

  return (
    <div>
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
      <button onClick={onClickSocial} name="google">Continue with Google</button>
      <button onClick={onClickSocial} name="github">Continue with Github</button>
    </div>
  )
}

export default Auth