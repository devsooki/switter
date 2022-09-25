import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    background-color: #000;
  }
  input {
    outline: none;
    border: 0;
  }
  input[type="submit"] {
    cursor: pointer;
  }
  button {
    cursor: pointer;
    border: 0;
  }

  ul {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  a {
    color: #000;
    text-decoration: none;
  }
`;

export default GlobalStyle;