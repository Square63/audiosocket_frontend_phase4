import login from "../styles/Login.module.scss"
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
    <div className="login-block">
      <div className="login-logo">
        <Image className="" src={Logo} alt="Workflow" onClick={() => {router.push("/")}} />
      </div>
      <h2 className="">Sign in to your artist account</h2>
      <Form className="form" noValidate validated={validated} ref={form} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" name="email" placeholder="Enter address" className="form-control" />
          <Form.Control.Feedback type="invalid">
            A valid email address is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" name="password" placeholder="Password" />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <div className="block-inline remember-text">
          <Form.Check
            type="switch"
            id="custom-switch"
            name="role"
            label="Login as collaborator"
          />
        </div>
        <div className="block-inline remember-text">
          <div>
            <label htmlFor="remember_me" className="checkbox">
              <input onClick={handleRememberMe} value={rememberMe} id="remember_me" name="remember_me" type="checkbox" />
              Remember me
              <span className={rememberMe ? "checkmark checked" : "checkmark"}></span>
            </label>
          </div>
          <div className="text-sm">
            <Link href={"/forgot-password"}>
              Forgot your password?
            </Link>
          </div>
        </div>
        <Button disabled={isLoading} variant="btn primary-btn btn-full-width" type="submit"><Image className="" src={isLoading ? Loader : Lock} alt="Workflow"/>
          Sign in
        </Button>
      </Form>
    </div>
  );
}

export default Login;