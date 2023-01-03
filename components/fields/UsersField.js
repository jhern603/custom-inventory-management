import { useState } from 'react';
import { EditUserForm } from './EditUserForm';
import { auth } from '../firebase';

const UserList = ({ users }) => {
  let disabled = true;
  const [userBeingEdited, setUserBeingEdited] = useState('');
  const [newUserInfo, setNewUserInfo] = useState({});
  const handleEditUser = (e) => {
    const user_object = users.find((obj) => {
      if (obj.pantherId == e.target.id) return obj;
    });
    if (user_object !== undefined) {
      setUserBeingEdited(user_object.pantherId);
      if (userBeingEdited) setUserBeingEdited('');
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Panther ID</th>
          <th>Can Modify Equipment?</th>
          <th>Member of Eboard?</th>
          <th>Admin?</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => {
          const canEditUsers =
            auth.currentUser.email === user.email && user.isAdmin;
          disabled = !disabled && canEditUsers;

          // Duplicates being made after save
          if (
            Object.keys(user).length > 0 &&
            user.pantherId != newUserInfo.pantherId
          ) {
            return (
              <UserItem
                user={user}
                userBeingEdited={userBeingEdited}
                disabled={disabled}
                handleEditUser={handleEditUser}
                setNewUserInfo={setNewUserInfo}
                setUserBeingEdited={setUserBeingEdited}
              />
            );
          } else if (
            Object.keys(newUserInfo).length > 0 &&
            user.pantherId != newUserInfo.pantherId
          ) {
            return (
              <UserItem
                user={newUserInfo}
                userBeingEdited={userBeingEdited}
                disabled={disabled}
                handleEditUser={handleEditUser}
                setNewUserInfo={setNewUserInfo}
                setUserBeingEdited={setUserBeingEdited}
              />
            );
          }
        })}
      </tbody>
    </table>
  );
};

const UserItem = ({
  user,
  userBeingEdited,
  disabled,
  handleEditUser,
  setNewUserInfo,
  setUserBeingEdited,
}) => {
  if (userBeingEdited != user.pantherId) {
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.pantherId}</td>
        <td>{user.canModifyEquipment ? 'Yes' : 'No'}</td>
        <td>{user.isEboard ? 'Yes' : 'No'}</td>
        <td>{user.isAdmin ? 'Yes' : 'No'}</td>
        {disabled ? null : (
          <td>
            <button
              type="submit"
              onClick={handleEditUser}
              id={user.pantherId}>
              Edit User
            </button>
          </td>
        )}
      </tr>
    );
  } else {
    return (
      <EditUserForm
        setNewUserInfo={setNewUserInfo}
        user={user}
        editingUser={userBeingEdited}
        handleEditUser={handleEditUser}
        setHandleEditUser={setUserBeingEdited}
      />
    );
  }
};
export { UserList };
