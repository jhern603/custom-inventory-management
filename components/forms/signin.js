import { useState } from 'react';
import { email_signin } from '../firebase';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState({ message: null });
  const signIn = async (e) => {
    e.preventDefault();
    setResult(await email_signin(email, password));
  };
  return (
    <div className="signin">
      <div className="signin__container">
        <form className="signin__form">
          <input
            type="text"
            className="signin__textbox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
          />
          <input
            type="password"
            className="signin__textbox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {result.message ? (
            <p>{result.message}</p>
          ) : result.email ? (
            <p>You have successfully logged in!</p>
          ) : null}
          <button
            className="signin__btn"
            onClick={signIn}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
export { SignIn };
