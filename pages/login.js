import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState, useRef, useContext, useEffect} from "react";
import {AuthContext} from "../store/authContext";
import {useRouter} from "next/router";
import login from "../styles/Login.module.scss";
import Link from "next/link";
import ForgotPassword from "../components/modals/ForgotPassword";

function Login() {
  const { authActions } = useContext(AuthContext);
  const form = useRef(null);
  const router = useRouter()
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRemeberMe] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('user')) {
      alert('Already logged in')
      router.push('/')
    }
  }, [])

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

  const handleClose = (show) => {
    setShowModal(show)
  }

  return (
    <div className={login.loginWrapper}>
      <div className={login.loginHeading}>
        <h1>sign in</h1>
        <p>Are you a new user? <Link href={"/signup"}>Sign up</Link></p>
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
              <Form noValidate validated={validated} ref={form} onSubmit={handleSubmit}>
                <Form.Group className={login.fieldControl} controlId="formBasicEmail">
                  <Form.Control required name="email" type="email" placeholder="Email*" />
                  <Form.Control.Feedback type="invalid">
                    A valid email address is required!
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={login.fieldControl} controlId="formBasicPassword">
                  <Form.Control required name="password" type="password" placeholder="Password*" />
                  <Form.Control.Feedback type="invalid">
                    Password is required!
                  </Form.Control.Feedback>
                  <div className={login.forgotPassword}>
                    <a onClick={() => setShowModal(true)}>Forgot password?</a>
                  </div>
                </Form.Group>
                <Form.Group className={login.fieldControl} controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Keep me logged in" />
                  <Form.Text className="text-muted">
                    Extends login. Do not select if you are on a public computer.
                  </Form.Text>
                </Form.Group>
                <Button type="submit" className={login.submit+' '+login.loginBtn}>
                  Login
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <ForgotPassword showModal={showModal} onCloseModal={handleClose} />
    </div>
  );

}

export default Login;
