import React, { FC, useState } from "react";
import { IServices } from "../types";
import styled from "@emotion/styled";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";

export interface IServicesChecklistProps {
  services: IServices;
  onChange: (services: IServices) => any;
}

const ServicesChecklist: FC<IServicesChecklistProps> = ({
  services,
  onChange
}) => {
  return (
    <>
      <InputGroup>
        <Checkbox
          label="Cuidado de niños"
          checked={services.childCare}
          onChange={childCare => onChange({ ...services, childCare })}
        />
      </InputGroup>
      <InputGroup>
        <Checkbox
          label="Hacer la compra"
          checked={services.shopping}
          onChange={shopping => onChange({ ...services, shopping })}
        />
      </InputGroup>
      <InputGroup>
        <Checkbox
          label="Productos de farmacia"
          checked={services.pharmacy}
          onChange={pharmacy => onChange({ ...services, pharmacy })}
        />
      </InputGroup>
      <InputGroup>
        <Checkbox
          label="Lavandería"
          checked={services.laundry}
          onChange={laundry => onChange({ ...services, laundry })}
        />
      </InputGroup>
      <InputGroup>
        <Checkbox
          label="Necesito que me llamen"
          checked={services.call}
          onChange={call => onChange({ ...services, call })}
        />
      </InputGroup>
      <InputGroup>
        <Checkbox
          label="Otros"
          checked={services.other}
          onChange={other => onChange({ ...services, other })}
        />
        <Input
          value={services.other ? services.otherText || "" : ""}
          onChange={e => onChange({ ...services, otherText: e.target.value })}
          disabled={!services.other}
        />
      </InputGroup>
    </>
  );
};

export default ServicesChecklist;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  margin-bottom: 20px;
  label {
    display: block;
    margin-bottom: 8px;
  }
`;
