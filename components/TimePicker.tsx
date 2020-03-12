import React, { FC } from "react";
import styled from "@emotion/styled";

const daysOfWeek = ["L", "M", "X", "J", "V", "S", "D"];
const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

interface ISelection {
 L?: number[];
 M?: number[];
 X?: number[];
 J?: number[];
 V?: number[];
 S?: number[];
 D?: number[];
};

interface ITimePickerProps {
  selection: ISelection;
  onChange: (newSelection: ISelection) => any;
}

const TimePicker: FC<ITimePickerProps> = ({ selection, onChange }) => {
  const onCellClick = (day: string, hour: number) => {
    if (selection[day] && selection[day].includes(hour)) {
      onChange({
        ...selection,
        [day]: selection[day].filter(h => h !== hour)
      });
    } else {
      onChange({
        ...selection,
        [day]: [...(selection[day] || []), hour]
      });
    }
  };

  return (
    <Wrap>
      <Table>
        <thead>
          <tr>
            <td>Hora</td>
            {daysOfWeek.map(day => (
              <td key={day}>{day}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map(hour => (
            <tr key={hour}>
              <td>{hour}:00</td>
              {daysOfWeek.map(day => (
                <Cell
                  key={`${day}-${hour}`}
                  selected={selection[day] && selection[day].includes(hour)}
                  onClick={() => onCellClick(day, hour)}
                ></Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrap>
  );
};

export default TimePicker;

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

  tbody tr > td:first-of-type {
    background-color: #f0f0f0;
  }
`;

const Cell = styled.td<{ selected: boolean }>`
  cursor: pointer;
  background-color: ${props => (props.selected ? "#5dc727" : "#fff")};
`;
