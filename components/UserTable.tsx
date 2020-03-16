import React, { FC } from "react";
import styled from "@emotion/styled";
import { IUser } from "../types";

export interface IUserTableProps {
  users: IUser[];
}

const UserTable: FC<IUserTableProps> = ({ users }) => {
  return (
    <Wrap>
      <Table>
        <thead>
          <tr>
            <td>Email</td>
            <td>Nombre</td>
            <td>Teléfono</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrap>
  );
};

export default UserTable;

const Wrap = styled.div`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  user-select: none;
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  font-size: 14px;
  font-weight: bold;

  thead td {
    background-color: #eee;
  }

  td {
    text-align: center;
    height: 26px;
    vertical-align: middle;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;

    &:last-of-type {
      border-right: none;
    }
  }

  tbody {
    tr:last-of-type td {
      border-bottom: none;
    }
  }
`;
