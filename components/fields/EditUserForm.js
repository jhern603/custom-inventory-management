import { useState } from 'react';
import { auth, update_email, update_doc } from '../firebase';
import { CheckBox } from './CheckBox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
        {auth.currentUser.email === props.user.email ? (
          <TextField
            variant="standard"
            type="text"
            id="email"
            defaultValue={props.user.email}
            onChange={handleChange}
          />
        ) : (
          <TextField
            variant="standard"
            type="text"
            id="email"
            defaultValue={props.user.email}
            onChange={handleChange}
            disabled
          />
        )}
      </TableCell>
      <TableCell>
        <p>{props.user.pantherId}</p>
      </TableCell>
      <TableCell>
        <CheckBox
          state={canModifyEquipment}
          setState={setModifyEquipment}
        />
      </TableCell>
      <TableCell>
        <CheckBox
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
