import { useRouter } from 'next/router';
import { useState } from 'react';
import { signout, auth, getdoc } from '../components/firebase';
import { Button, AppBar, Toolbar } from '@mui/material';

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
    <AppBar
      position="static"
      name="nav__container">
      <Toolbar>
        <Button
          name="nav__button"
          id=""
          sx={{ flexGrow: 1, mr: 75 }}
          variant="contained"
          onClick={handleRoute}>
          Home
        </Button>
        {authState ? (
          <>
            {canEdit ? (
              <>
                <Button
                  name="nav__button"
                  variant="contained"
                  id="equipment/addNew"
                  sx={{ flexGrow: 1, mr: 1 }}
                  onClick={handleRoute}>
                  Add New Equipment
                </Button>
                <Button
                  name="nav__button"
                  variant="contained"
                  id="equipment/get"
                  sx={{ flexGrow: 1, mr: 1 }}
                  onClick={handleRoute}>
                  Get Equipment
                </Button>
              </>
            ) : null}
            <Button
              name="nav__button"
              variant="contained"
              id="equipment/checkout"
              sx={{ flexGrow: 1, mr: 1 }}
              onClick={handleRoute}>
              Checkout Equipment
            </Button>
            <Button
              name="nav__button"
              variant="contained"
              sx={{ flexGrow: 1, mr: 1 }}
              onClick={handleSignout}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button
              name="nav__button"
              variant="contained"
              id="user/register"
              sx={{ flexGrow: 1, mr: 1 }}
              onClick={handleRoute}>
              Register
            </Button>
            <Button
              name="nav__button"
              variant="contained"
              id="user/signin"
              sx={{ flexGrow: 1, mr: 1 }}
              onClick={handleRoute}>
              Sign In
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export { Navbar };
