import { useState, useEffect } from 'react';
import { EditUserForm } from './EditUserForm';
import { auth } from '../firebase';

const UserList = ({ users }) => {
  let disabled = true;
  const [userBeingEdited, setUserBeingEdited] = useState('');
  const [newUserInfo, setNewUserInfo] = useState({});
  let isAdmin = false;

  const handleEditUser = (e) => {
    const user_object = users.find((obj) => {
      if (obj.pantherId === e.target.id) return obj;
    });
    if (user_object !== undefined) {
      setUserBeingEdited(user_object.pantherId);
      if (userBeingEdited) setUserBeingEdited('');
    }
  };
  const setIsAdmin = (user) => {
    if (!isAdmin && (user.isAdmin && user.email === auth.currentUser.email))
      isAdmin = true;
  };

  users.map((user) => {
    setIsAdmin(user);
  });
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
          disabled = true && isAdmin;
          if (user.pantherId !== newUserInfo.pantherId) {
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
          } else if (Object.keys(newUserInfo).length > 0) {
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

const UserItem = (props) => {
  if (props.userBeingEdited != props.user.pantherId) {
    return (
      <tr>
        <td>{props.user.name}</td>
        <td>{props.user.email}</td>
        <td>{props.user.pantherId}</td>
        <td>{props.user.canModifyEquipment ? 'Yes' : 'No'}</td>
        <td>{props.user.isEboard ? 'Yes' : 'No'}</td>
        <td>{props.user.isAdmin ? 'Yes' : 'No'}</td>
        {!props.disabled ? null : (
          <td>
            <button
              type="submit"
              onClick={props.handleEditUser}
              id={props.user.pantherId}>
              Edit User
            </button>
          </td>
        )}
      </tr>
    );
  } else {
    return (
      <EditUserForm
        setNewUserInfo={props.setNewUserInfo}
        user={props.user}
        editingUser={props.userBeingEdited}
        handleEditUser={props.handleEditUser}
        setHandleEditUser={props.setUserBeingEdited}
      />
    );
  }
};
export { UserList };
