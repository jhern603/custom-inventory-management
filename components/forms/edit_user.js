import { useState } from 'react';
import { update_email, update_doc } from '../firebase';
import { RadioCustom } from '../fields/CheckBox';
import {
  Radio,
  Button,
  TextField,
  TableRow,
  TableCell,
} from '@mui/material';

const EditUserForm = (props) => {
  const [isEboard, setEboard] = useState(props.user.isEboard);
  const [canModifyEquipment, setModifyEquipment] = useState(
    props.user.canModifyEquipment
  );
  let newUserInfo = { ...props.user };

  const handleSave = () => {
    newUserInfo.isEboard = isEboard;
    newUserInfo.canModifyEquipment = canModifyEquipment;
    if (newUserInfo.email != props.user.email) {
      if (
        confirm('You are about to change your email. Are you sure about this?')
      )
        update_email(newUserInfo.email, newUserInfo.pantherId);
      else newUserInfo.email = props.user.email;
    }
    props.setNewUserInfo(newUserInfo);
    update_doc(newUserInfo);
    props.setHandleEditUser('');
  };

  const handleChange = (e) => {
    newUserInfo[e.target.id] = e.target.value;
  };

  return (
    <TableRow>
      <TableCell>
        <TextField
          variant="standard"
          type="text"
          id="name"
          defaultValue={props.user.name}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        <TextField
          variant="standard"
          type="text"
          id="email"
          defaultValue={props.user.email}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        <p>{props.user.pantherId}</p>
      </TableCell>
      <TableCell>
        <RadioCustom
          state={canModifyEquipment}
          setState={setModifyEquipment}
        />
      </TableCell>
      <TableCell>
        <RadioCustom
          state={isEboard}
          setState={setEboard}
        />
      </TableCell>
      <TableCell>
        <Radio
          type="checkbox"
          defaultChecked={props.user.isAdmin}
          disabled
        />
      </TableCell>
      <TableCell>
        <Button
          type="button"
          onClick={props.handleEditUser}
          id={props.user.pantherId}>
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => handleSave(props.user)}>
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
};

export { EditUserForm };
