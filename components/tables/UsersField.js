import { useState } from 'react';
import { EditUserForm } from '../forms';
import { auth } from '../firebase';
import {
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  TableContainer,
  Button,
} from '@mui/material';

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
    if (!isAdmin && user.isAdmin && user.email === auth.currentUser.email)
      isAdmin = true;
  };

  users.map((user) => {
    setIsAdmin(user);
  });
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Panther ID</TableCell>
            <TableCell>Can Modify Equipment?</TableCell>
            <TableCell>Member of Eboard?</TableCell>
            <TableCell>Admin?</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody>
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const UserItem = (props) => {
  if (props.userBeingEdited != props.user.pantherId) {
    return (
      <TableRow>
        <TableCell>{props.user.name}</TableCell>
        <TableCell>{props.user.email}</TableCell>
        <TableCell>{props.user.pantherId}</TableCell>
        <TableCell>{props.user.canModifyEquipment ? 'Yes' : 'No'}</TableCell>
        <TableCell>{props.user.isEboard ? 'Yes' : 'No'}</TableCell>
        <TableCell>{props.user.isAdmin ? 'Yes' : 'No'}</TableCell>
        {!props.disabled ? null : (
          <TableCell>
            <Button
              type="submit"
              onClick={props.handleEditUser}
              id={props.user.pantherId}>
              Edit User
            </Button>
          </TableCell>
        )}
      </TableRow>
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
