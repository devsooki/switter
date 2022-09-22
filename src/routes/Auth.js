import React from 'react'

// components
import AuthForm from 'components/AuthForm'

// tool
import { authService } from 'fBase'
import { 
  GithubAuthProvider, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth'

const Auth = () => {

  const onClickSocial = async (e) => {
    const {
      target: { name }
    } = e

    let provider;

    if (name === 'google') {
      provider = new GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new GithubAuthProvider()
    }

    await signInWithPopup(authService, provider)
  }

  return (
    <div>
      <AuthForm />
      <button onClick={onClickSocial} name="google">Continue with Google</button>
      <button onClick={onClickSocial} name="github">Continue with Github</button>
    </div>
  )
}

export default Auth