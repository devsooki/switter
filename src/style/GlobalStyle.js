import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: #000;
  }
  input {
    outline: none;
    border: 0;

    &[type="submit"] {
      cursor: pointer;
    }
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