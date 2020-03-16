import styled from "@emotion/styled";

const Input = styled.input`
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  padding: 10px 16px;
  font-weight: 500;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #409912;
    border-color: transparent;
  }

  &[disabled] {
    cursor: not-allowed;
    background-color: #eee;
  }
`;

export default Input;
