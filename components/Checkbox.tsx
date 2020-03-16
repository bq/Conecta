import { FC } from "react";
import styled from "@emotion/styled";
import { Checkbox as ReakitCheckbox } from "reakit/Checkbox";

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (value: boolean) => any;
  label?: string | JSX.Element;
  className?: string;
}

const Checkbox: FC<CheckboxProps> = ({ className, checked, onChange, label }) => {
  return (
    <Container
      className={className}
      checked={checked}
      onChange={() => onChange && onChange(!checked)}
      as={`div` as "input"}
    >
      <Box checked={checked} />
      <Label>{label}</Label>
    </Container>
  );
};

export default Checkbox;

interface BoxProps {
  checked?: boolean;
}
const Box = styled.div<BoxProps>`
  width: 20px;
  min-width: 20px;
  height: 20px;
  border-radius: 3px;
  border: solid 1px #666666;
  background-color: #ffffff;
  cursor: pointer;
  background-image: url(${props =>
    props.checked ? "/check.svg" : "none"});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 21px 21px;
`;

const Container = styled(ReakitCheckbox)`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  width: 100%;

  &:focus {
    outline: none;
    ${Box} {
      box-shadow: 0 0 0 2px #409912;
      border-color: transparent;
    }
  }
`;

const Label = styled.label`
  margin-left: 10px;
  cursor: pointer;
  line-height: 1.33;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
