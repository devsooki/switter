import React from 'react'

// components
import AuthForm from 'components/AuthForm'

// style
import styled from 'styled-components'

// tool
import { authService } from 'fBase'
import { 
  GithubAuthProvider, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

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
    <Container>
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
      />
      <AuthForm />
      <ButtonContainer>
        <Button onClick={onClickSocial} name="google">
          <span>Continue with Google</span>
          <FontAwesomeIcon icon={faGoogle} />  
        </Button>
        <Button onClick={onClickSocial} name="github">
          <span>Continue with Github</span>
          <FontAwesomeIcon icon={faGithub} />
        </Button>
      </ButtonContainer>
    </Container>
  )
}

export default Auth

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 350px;
  height: 100vh;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Button = styled.button`
  padding: 10px;
  border: 0;
  background-color: #fff;

  span {
    margin-right: 5px;
  }
`