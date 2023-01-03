import { useState } from 'react';
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
    setNewUserInfo(newUserInfo);
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
        <input
          type="text"
          name="email"
          defaultValue={user.email}
          onChange={handleChange}
        />
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
