import { useState } from 'react';
import { email_signup } from '../firebase';
import validator from 'validator';

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

  return (
    <div className="register">
      <div className="register__container">
        <form className="register__form">
          <input
            type="text"
            className="register__textbox"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            required
          />
          <input
            type="text"
            className="register__textbox"
            onChange={(e) => setPID(e.target.value)}
            placeholder="Panther ID"
          />
          <input
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
              <p>
                Your password must be:
                <br />
                At least 6 characters long,
                <br />
                Have 1 lowercase letter, Have 1 uppercase letter, Have 1 number,
                <br />
                Have 1 symbol.
              </p>
            </span>
          )}
          {result ? <p>{result.message}</p> : null}
          <button
            className="register__btn"
            onClick={register}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
export { Register };
