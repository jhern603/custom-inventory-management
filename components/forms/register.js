import { useState } from 'react';
import { email_signup } from '../firebase';
import validator from 'validator';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function Register() {
  const [email, setEmail] = useState('');
  const [errorState, setErrorState] = useState(false);
  const [result, setResult] = useState('');
  const [pid, setPID] = useState('');
  const [password, setPassword] = useState('');

  const register = async (e) => {
    e.preventDefault();
    setResult(await email_signup(email, password, pid));
    setPassword('');
  };

  const validate = (value) => {
    const validPassword = validator.isStrongPassword(value, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
    if (validPassword) {
      setErrorState(false);
    } else {
      setErrorState(true);
    }
  };

  // Fix styling in CSS to separate fields instead of using < br/>
  return (
    <div className="register">
      <div className="register__container">
        <form className="register__form">
          <TextField
            variant="standard"
            type="text"
            className="register__textbox"
            onChange={(e) => setPID(e.target.value)}
            placeholder="Panther ID"
          />
          <br />
          <TextField
            variant="standard"
            type="text"
            className="register__textbox"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            required
          />
          <br />
          <TextField
            variant="standard"
            type="password"
            className="register__textbox"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validate(password);
            }}
            placeholder="Password"
          />
          {!errorState ? null : (
            <span>
              <Alert severity="warning">
                Your password must be:
                <br />
                - At least 6 characters long,
                <br />
                - Have 1 lowercase letter, Have 1 uppercase letter, Have 1
                number,
                <br />- Have 1 symbol.
              </Alert>
            </span>
          )}
          {result.message ===
          'Account Successfully Created. Click the verification link sent to your email to complete the sign-up process.' ? (
            <>
              <br />
              <br />
              <Alert severity="success">
                <AlertTitle>Account successfully created!</AlertTitle>
                Click the verification link sent to your email to complete the
                sign-up process.
              </Alert>
            </>
          ) : (
            <>
              <br />
              <br />
              <Alert severity="error">
                <AlertTitle>
                  We have run into an issue while creating your account!
                </AlertTitle>
                {result.message}
              </Alert>
            </>
          )}
          <br />
          <Button
            variant="outlined"
            className="register__btn"
            onClick={register}>
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
export { Register };
