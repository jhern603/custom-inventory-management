import { useState } from 'react';

import { Alert, Button, TextField } from '@mui/material';
//pass firebase as prop
function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState({ message: null });
  const signIn = async (e) => {
    e.preventDefault();
    setResult(await props.email_signin(email, password));
  };
  return (
    <div className="signin">
      <div className="signin__container">
        <form className="signin__form">
          <TextField
            type="text"
            variant="standard"
            className="signin__textbox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="E-mail Address"
          />
          <br />
          <TextField
            type="password"
            variant="standard"
            className="signin__textbox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
          {result.message ? (
            <>
              <br />
              <br />
              <Alert severity="error">{result.message}</Alert>
            </>
          ) : result.email ? (
            <Alert severity="success">You have successfully logged in!</Alert>
          ) : null}
          <br />
          <Button
            className="signin__btn"
            variant="outlined"
            onClick={signIn}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
export { SignIn };
