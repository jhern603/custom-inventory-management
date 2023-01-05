import { UserList } from '../../components/fields';
import { getdoc } from '../../components/firebase';
import { useState } from 'react';
export default function Index() {
  const [docRetrieved, setDocRetrieved] = useState(false);
  const [users, setUsers] = useState([]);
  if (!docRetrieved) {
    getdoc().then((doc) => {
      setUsers(doc);
      setDocRetrieved(true);
    });
    
  } else {
    return (
      <div className="body">
        <UserList users={users} />
      </div>
    );
  }
}
