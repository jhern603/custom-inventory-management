import { useRouter } from 'next/router';
import { useState } from 'react';
import { signout, auth } from '../components/firebase';

function Navbar() {
  const router = useRouter();
  const [authState, setAuthState] = useState(false);
  if (!authState && auth.currentUser) {
    setAuthState(true);
  }
  const handleSignout = async () => {
    setAuthState(await signout());
    router.push('/');
  };
  const handleRoute = (e) => {
    router.push('/' + e.target.name);
  };

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
          <input
            type="button"
            value="Add New Equipment"
            name="addEquipment"
            onClick={handleRoute}
          />
          <input
            type="button"
            value="Get Equipment"
            name="getEquipment"
            onClick={handleRoute}
          />
          <input
            type="button"
            value="Checkout Equipment"
            name="checkoutEquipment"
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
