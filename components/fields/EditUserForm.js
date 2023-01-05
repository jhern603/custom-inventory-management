import { useState } from 'react';
import { auth, update_email, update_doc } from '../firebase';
import { CheckBox } from './CheckBox';

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
    newUserInfo[e.target.name] = e.target.value;
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          id="name"
          defaultValue={props.user.name}
          onChange={handleChange}
        />
      </td>
      <td>
        {auth.currentUser.email === props.user.email ? (
          <input
            type="text"
            id="email"
            defaultValue={props.user.email}
            onChange={handleChange}
          />
        ) : (
          <input
            type="text"
            id="email"
            defaultValue={props.user.email}
            onChange={handleChange}
            disabled
          />
        )}
      </td>
      <td>
        <p>{props.user.pantherId}</p>
      </td>
      <td>
        <CheckBox
          state={canModifyEquipment}
          setState={setModifyEquipment}
        />
      </td>
      <td>
        <CheckBox
          state={isEboard}
          setState={setEboard}
        />
      </td>
      <td>
        <input
          type="checkbox"
          defaultChecked={props.user.isAdmin}
          disabled
        />
      </td>
      <td>
        <button
          type="button"
          onClick={props.handleEditUser}
          id={props.user.pantherId}>
          Cancel
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={() => handleSave(props.user)}>
          Save
        </button>
      </td>
      <td>
        <p> editing user</p>
      </td>
    </tr>
  );
};

export { EditUserForm };
