import React from 'react'
import { Link } from 'react-router-dom'

// style
import styled from 'styled-components'

// tool
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";


const Navigation = () => {
  return (
    <Nav>
      <MenuList>
        <li>
          <Link to="/">
          <FontAwesomeIcon
            icon={faTwitter}
            color={'#04aaff'}
            size='3x'
          />
          </Link>
        </li>
        <li>
          <Link to="/profile">
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          </Link>
        </li>
      </MenuList>
    </Nav>
  )
}

export default Navigation

const Nav = styled.nav`
  margin: 50px 0 70px;
  padding: 0 10px;
  width: 350px;
`
const MenuList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
`