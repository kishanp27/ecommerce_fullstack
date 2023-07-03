import { darkGreen } from "@/lib/colors";
import { styled, css } from "styled-components";
export const ButtonStyle = css`
  border: 0;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-weight: 500;
  svg {
    height: 16px;
    margin-right: 5px;
  }

  ${
    (props) => 
      props.block && css`
        display: block;
        width: 100%;
        margin-top: 0.5rem;
      `
  }

  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}

  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}

  ${(props) =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;
    `}

  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}

    ${(props) =>
    props.primary && !props.outline &&
    css`
      /* background-color: #5542f6; */
      background-color: darkGreen;
      color: #fff;
      border: 1px solid #5542f6;
    `}

    ${(props) =>
    props.primary && props.outline &&
    css`
      background-color: transparent;
      color: darkGreen;
      border: 1px solid darkGreen;
    `}

    ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
`;

const StyledButton = styled.button`
    ${ButtonStyle}
`;

export default function Button(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}
