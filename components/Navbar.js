import { useRouter } from 'next/router';
import { useState } from 'react';
import { signout, auth, getdoc } from '../components/firebase';
import Button from '@mui/material/Button';

function Navbar() {
  const router = useRouter();
  const [authState, setAuthState] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const handleSignout = async () => {
    setAuthState(await signout());
    router.push('/');
  };
  const handleRoute = (e) => {
    router.push('/' + e.target.id);
  };
auth.onAuthStateChanged(() => {
  if (!authState && !Object.is(auth.currentUser, null)) {
    setAuthState(true);
    getdoc(auth.currentUser.email).then((val) =>
      setCanEdit(val['canModifyEquipment'])
    );
  }
});

return (
  <nav>
    <Button
      id=""
      variant="outlined"
      onClick={handleRoute}>
      Home
    </Button>
    {authState ? (
      <>
        {canEdit ? (
          <>
            <Button
              variant="outlined"
              id="equipment/addNew"
              onClick={handleRoute}>
              Add New Equipment
            </Button>
            <Button
              variant="outlined"
              id="equipment/get"
              onClick={handleRoute}>
              Get Equipment
            </Button>
          </>
        ) : null}
        <Button
          variant="outlined"
          id="equipment/checkout"
          onClick={handleRoute}>
          Checkout Equipment
        </Button>
        <Button
          variant="outlined"
          onClick={handleSignout}>
          Sign OUt
        </Button>
      </>
    ) : (
      <>
        <Button
          variant="outlined"
          id="user/register"
          onClick={handleRoute}>
          Register
        </Button>
        <Button
          variant="outlined"
          id="user/signin"
          onClick={handleRoute}>
          Sign In
        </Button>
      </>
    )}
  </nav>
);
}

export { Navbar };
