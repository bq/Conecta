import styled from "@emotion/styled";

export interface ButtonProps {
  pink?: boolean;
  secondary?: boolean;
}

const Button = styled.button<ButtonProps>`
  font-family: "Inter", sans-serif;
  height: 44px;
  border-radius: 6px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  font-size: 16px;
  border: none;
  padding: 0px 20px;
  cursor: pointer;
  font-weight: 600;
  color: white;

  background-color: ${props => {
    if (props.pink) {
      return "#d333a2";
    }

    return "#5dc727";
  }};

  &[disabled] {
    cursor: not-allowed;
  }
`;

export default Button
