import { useState, useEffect } from 'react';
import { getdoc, auth } from '../firebase';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [disabled, setDisabled] = useState(true);

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
      {users.map((user) => {
        if (!disabled)
          if (auth.currentUser.email === user.email && user.isAdmin) {
            setDisabled(!disabled);
          }
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
                {!disabled ? (
                  <button
                    type="button"
                    disabled>
                    Edit User
                  </button>
                ) : (
                  <button type="button">Edit User</button>
                )}
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};
export { UserList };
