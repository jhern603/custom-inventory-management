import { useState } from 'react';
import {
  InputLabel,
  MenuItem,
  Select,
  Radio,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  TableContainer,
  Typography,
  Button,
} from '@mui/material';

const EquipmentTable = ({ setData }) => {
  const conf = require('../../conf.json');
  const [equipmentData, setEquipmentData] = useState([]);
  const [item, setItem] = useState('');
  const [selected, setSelected] = useState(false);
  const [selectState, setSelectState] = useState();
  const [count, setCount] = useState(0);

  const handleItem = (e) => {
    setItem(e.target.id);
    setSelected(true);
  };

  const handleSearch = async (event) => {
    setSelectState(event.target.value);
    const response = await fetch('/api/listEquipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event.target.value),
    });
    const result = await response.json();
    setEquipmentData(result.data);
    setCount(result.data.length);
  };

  const handleCheckout = (e) => {
    equipmentData.map((equipment) => {
      if (equipment['Serial Number'] === item) setData(equipment);
    });
  };

  return (
    <>
      {selected ? (
        <Button variant='outlined' onClick={handleCheckout}>Continue To Checkout</Button>
      ) : (
        ''
      )}
      <>
        <InputLabel htmlFor="filter">Filter by Type:</InputLabel>
        <Select
          variant="standard"
          name="filter"
          onChange={handleSearch}
          value={selectState ? selectState : 'All'}>
          <MenuItem
            key="All"
            value="All">
            All
          </MenuItem>
          {conf.type_list.map((item) => {
            return (
              <MenuItem
                key={item}
                value={item}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </>
      <TableContainer>
        <Table>
          <TableHead>
            <TableCell>Select for Checkout</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Manuf/Model</TableCell>
            <TableCell>Serial Number</TableCell>
          </TableHead>

          <TableBody>
            {equipmentData.map((record) => {
              return (
                <TableRow>
                  <TableCell>
                    <Radio
                      name="item_radio"
                      id={record['Serial Number']}
                      onChange={handleItem}
                      checked={item === record['Serial Number']}
                    />
                  </TableCell>
                  <TableCell key={record['Type']}>{record['Type']}</TableCell>
                  <TableCell key={record['Manuf/Model']}>
                    {record['Manuf/Model']}
                  </TableCell>
                  <TableCell key={record['Serial Number']}>
                    {record['Serial Number']}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography>Total Count: {count}</Typography>
    </>
  );
};

export { EquipmentTable };
