import Link from "next/link";
import Image from "next/image";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Logo from '../images/logo-black.svg';
import Lock from '../images/lock.svg';
import Loader from '../images/loader.svg';
import {useState, useRef, useContext} from "react";
import {AuthContext} from "../store/authContext";
import {useRouter} from "next/router";
import login from "../styles/Login.module.scss";

function Login() {
  const { authActions } = useContext(AuthContext);
  const form = useRef(null);
  const router = useRouter()
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRemeberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loginForm = e.currentTarget;
    if (loginForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      setIsLoading(false);
    } else {
      const data = new FormData(form.current);
      if(!data.get('remember_me'))
        data.append('remember_me', false)

      authActions.userDataStateChanged(data.get('email'));
      e.target.reset();
      router.push('/');
    }
  }

  const handleRememberMe = (e) => {
    setRemeberMe(!rememberMe);
  }

  return (
    <div className={login.loginWrapper}>
      <div className={login.loginHeading}>
        <h1>sign in</h1>
        <p>Are you a new user? <a href="">Sign Up</a></p>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className={login.existingAccount}>
            <h2>Use an existing account</h2>
            <div className={login.socialBtn}>
              <a href='' className={login.facebook+' '+login.loginBtn}>facebook</a>
              <a href='' className={login.google+' '+login.loginBtn}>google</a>
              <a href='' className={login.linkedin+' '+login.loginBtn}>linkedin</a>
            </div>
          </div>
        </div>
        <div className="col-md-6 loginSeprator">
          <div className={login.useEmail}>
            <h2>Use your email address</h2>
            <div className={login.formWrapper}>
              <Form>
                <Form.Group className={login.fieldControl} controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group className={login.fieldControl} controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Password" />
                  <div className={login.forgotPassword}>
                    <a href="">Forgot password?</a>
                  </div>
                </Form.Group>
                <Form.Group className={login.fieldControl} controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Keep me logged in" />
                  <Form.Text className="text-muted">
                    Extends login. Do not select if you are on a public computer.
                  </Form.Text>
                </Form.Group>
                <a href="" className={login.submit+' '+login.loginBtn}>
                  Submit
                </a>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Login;
