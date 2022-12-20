import { useState, useEffect } from 'react';
import { EditUserForm } from './EditUserForm';
import { getdoc, auth } from '../firebase';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [editingUser, setEditingUser] = useState('');


  const handleEditUser = (user) => {
    setEditingUser(user.name);
    if (editingUser) setEditingUser('');
  };

  useEffect(() => {
    let isMounted = true;
    getdoc().then((doc) => {
      if (isMounted) setUsers(doc);
    });
    return () => (isMounted = false);
  }, []);

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

      {/* Display each user from firebase in a row */}
      {users.map((user) => {
        if (disabled)
          if (auth.currentUser.email === user.email && user.isAdmin) {
            setDisabled(!disabled);
          }
        
        if (editingUser != user.name)
          return (
            <tbody>
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.pantherId}</td>
                <td>{user.canModifyEquipment ? 'Yes' : 'No'}</td>
                <td>{user.isEboard ? 'Yes' : 'No'}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td>
                  {disabled ? null : (
                    <button
                      type="button"
                      onClick={() => handleEditUser(user)}>
                      Edit User
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          );
        else
          return (
            <tbody>
              <EditUserForm
                user={user}
                disabled={disabled}
                editingUser={editingUser}
                handleEditUser={handleEditUser}
              />
            </tbody>
          );
      })}
    </table>
  );
};
export { UserList };
