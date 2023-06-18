import { UserList } from '../../components/tables';
import { getdoc } from '../api/internal/firebase';
import { useState } from 'react';

export default function Index() {
  const [docRetrieved, setDocRetrieved] = useState(false);
  const [users, setUsers] = useState([]);

  switch (docRetrieved) {
    case true:
      getdoc().then((doc) => {
        setUsers(doc);
        setDocRetrieved(true);
      });
      break;
    default:
      return (
        <div className="body">
          <UserList users={users} />
        </div>
      );
  }
}
