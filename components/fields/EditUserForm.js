import { useState } from 'react';
import { auth, update_email, update_doc } from '../firebase';

const EditUserForm = ({
  user,
  handleEditUser,
  setHandleEditUser,
  setNewUserInfo,
}) => {
  const [isEboard, setEboard] = useState(user.isEboard);
  const [canModifyEquipment, setModifyEquipment] = useState(
    user.canModifyEquipment
  );
  let newUserInfo = { ...user };

  const handleSave = () => {
    newUserInfo.isEboard = isEboard;
    newUserInfo.canModifyEquipment = canModifyEquipment;
    if (newUserInfo.email != user.email) {
      if (
        confirm('You are about to change your email. Are you sure about this?')
      )
        update_email(newUserInfo.email, newUserInfo.pantherId);
      else newUserInfo.email = user.email;
    }
    setNewUserInfo(newUserInfo);
    update_doc(newUserInfo);
    setHandleEditUser('');
  };

  const handleChange = (e) => {
    newUserInfo[e.target.name] = e.target.value;
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          name="name"
          defaultValue={user.name}
          onChange={handleChange}
        />
      </td>
      <td>
        {auth.currentUser.email === user.email ? (
          <input
            type="text"
            name="email"
            defaultValue={user.email}
            onChange={handleChange}
          />
        ) : (
          <input
            type="text"
            name="email"
            defaultValue={user.email}
            onChange={handleChange}
            disabled
          />
        )}
      </td>
      <td>
        <p>{user.pantherId}</p>
      </td>
      <td>
        <CustomChecked
          state={canModifyEquipment}
          setState={setModifyEquipment}
        />
      </td>
      <td>
        <CustomChecked
          state={isEboard}
          setState={setEboard}
        />
      </td>
      <td>
        <input
          type="checkbox"
          defaultChecked={user.isAdmin}
          disabled
        />
      </td>
      <td>
        <button
          type="button"
          onClick={handleEditUser}
          id={user.pantherId}>
          Edit User
        </button>
      </td>
      <td>
        <button
          type="button"
          onClick={() => handleSave(user)}>
          Save
        </button>
      </td>
      <td>
        <p> editing user</p>
      </td>
    </tr>
  );
};

const CustomChecked = ({ state, setState }) => {
  const handleState = () => {
    setState(!state);
  };

  return (
    <input
      type="checkbox"
      onChange={handleState}
      checked={state}
    />
  );
};

export { EditUserForm };
