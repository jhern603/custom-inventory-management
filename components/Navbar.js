import { useRouter } from 'next/router';
import { useState } from 'react';
import { signout, auth, getdoc } from '../components/firebase';

function Navbar() {
  const router = useRouter();
  const [authState, setAuthState] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const handleSignout = async () => {
    setAuthState(await signout());
    router.push('/');
  };
  const handleRoute = (e) => {
    router.push('/' + e.target.name);
  };

  auth.onAuthStateChanged(() => {
    if (!authState && auth.currentUser) {
      setAuthState(true);
      getdoc(auth.currentUser.email).then((val) =>
        setCanEdit(
          val.docs[0]['_document']['data']['value']['mapValue']['fields'][
            'canModifyEquipment'
          ]['booleanValue']
        )
      );
    }
  });

  return (
    <nav>
      <input
        type="button"
        value="Home"
        name=""
        onClick={handleRoute}
      />
      {authState ? (
        <>
          {canEdit ? (
            <>
              <input
                type="button"
                value="Add New Equipment"
                name="equipment/addNew"
                onClick={handleRoute}
              />
              <input
                type="button"
                value="Get Equipment"
                name="equipment/get"
                onClick={handleRoute}
              />
            </>
          ) : null}
          <input
            type="button"
            value="Checkout Equipment"
            name="equipment/checkout"
            onClick={handleRoute}
          />
          <input
            type="button"
            value="Sign Out"
            onClick={handleSignout}
          />
        </>
      ) : (
        <>
          <input
            type="button"
            value="Register"
            name="register"
            onClick={handleRoute}
          />
          <input
            type="button"
            value="Sign In"
            name="signin"
            onClick={handleRoute}
          />
        </>
      )}
    </nav>
  );
}

export { Navbar };
