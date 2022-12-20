import { useState } from 'react';
const EditUserForm = ({ user, disabled, handleEditUser }) => {
  const [isEboard, setIsEboard] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [canModifyEquipment, setCanModifyEquipment] = useState(false);
  let newUserInfo = {};

  const CustomChecked = ({ property, state, setState }) => {
    const handleState = () => {
      if (property) setState(!state);
    };
    return (
      <input
        type="checkbox"
        onChange={handleState}
        checked={property}
      />
    );
  };

  const handleSave = () => {
    user = newUserInfo;
    handleEditUser(user);
  };

  const handleChange = (e) => {
    newUserInfo = {...user};
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
      <td>{user.pantherId}</td>
      <td>
        <CustomChecked
          property={user.canModifyEquipment}
          state={canModifyEquipment}
          setState={setCanModifyEquipment}
        />
      </td>
      <td>
        <CustomChecked
          property={user.isEboard}
          state={isEboard}
          setState={setIsEboard}
        />
      </td>
      <td>
        <CustomChecked
          property={user.isAdmin}
          state={isAdmin}
          setState={setIsAdmin}
        />
      </td>
      <td>
        <button
          type="button"
          onClick={() => handleEditUser(user.name)}>
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
      <td>editing user</td>
    </tr>
  );
};
export { EditUserForm };
