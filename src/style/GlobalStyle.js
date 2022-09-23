import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #000;
  }
  input {
    outline: none;
  }
  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;