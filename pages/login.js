import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState, useRef, useContext, useEffect} from "react";
import Link from "next/link";
import Image from 'next/image';
import {LoaderImage} from "../components/LoaderImage";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TOAST_OPTIONS } from '../common/api';
import {AuthContext} from "../store/authContext";
import { authLogin } from "../redux/actions/authActions";
import { facebookLogin } from "../redux/actions/authActions";
import { gmailLogin } from "../redux/actions/authActions";
import {useRouter} from "next/router";
import login from "../styles/Login.module.scss";
import ForgotPassword from "../components/modals/ForgotPassword";
import { useCookie } from 'next-cookie'

function Login() {
  const cookie = useCookie()
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.auth);
  const SocialLogIn = useSelector(state => state.auth.url);
  const { authActionsContext } = useContext(AuthContext);
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

  useEffect(() => {
    if (SocialLogIn && !(localStorage.getItem('user')))
      window.location.assign(SocialLogIn);
  }, [SocialLogIn])

  useEffect(() => {
    if (!SocialLogIn) {
      if(loggedInUser.error) {
        toast.error(loggedInUser.error.message, TOAST_OPTIONS);
      } else if(Object.keys(loggedInUser.user).length) {
        debugger
        localStorage.setItem("user", JSON.stringify(loggedInUser.user));
        localStorage.setItem("first_name", JSON.stringify(loggedInUser.userDetails.first_name));
        localStorage.setItem("last_name", JSON.stringify(loggedInUser.userDetails.last_name));
        localStorage.setItem("email", JSON.stringify(loggedInUser.userDetails.email));
        localStorage.setItem("has_subscription", JSON.stringify(loggedInUser.userDetails.subscription_flag));
        cookie.set('user', JSON.stringify(loggedInUser.user))
        toast.success('Successfully Logged In.');
        if (window.location.search){
          let urlParams = new URLSearchParams(window.location.search);
          let newPath = urlParams.get('returnUrl');
          router.push(newPath);
        } else {
          router.push('/');
        }
      }
    }
  }, [loggedInUser])

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

      let authData = {
				email: data.get('email'),
        password: data.get('password')
			};
      dispatch(authLogin(authData));
    }
  }

  const handleRememberMe = (e) => {
    setRemeberMe(!rememberMe);
  }

  const handleClose = (show) => {
    setShowModal(show)
  }

  const handleFacebookLogin = () => {
    dispatch(facebookLogin());
  }

  const handleGmailLogin = () => {
    dispatch(gmailLogin());
  }

  return (
    <div className={login.loginWrapper}>
      <div className={login.loginHeading}>
        <h1>Sign In</h1>
        <p>Don’t have an account yet?<Link href={"/signup"}>Sign up</Link></p>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={10000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: "auto" }}
      />
      <div className={login.formwrapper}>
        <div className={login.useEmail}>
          <h2>Use your email address</h2>
          <div className={login.wrapper}>
            <Form noValidate validated={validated} ref={form} onSubmit={handleSubmit}>
              <Form.Group className={login.fieldControl} controlId="formBasicEmail">
                <Form.Control required name="email" type="email" placeholder="Email" />
                <Form.Control.Feedback type="invalid">
                  A valid email address is required!
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={login.fieldControl} controlId="formBasicPassword">
                <Form.Control required name="password" type="password" placeholder="Password" />
                <Form.Control.Feedback type="invalid">
                  Password is required!
                </Form.Control.Feedback>
                <div className={login.forgotPassword}>
                <Link href={"/forgot_password"}><a>Forgot password?</a></Link>

                </div>
              </Form.Group>
              <Button type="submit" className={login.submit+' '+login.loginBtn}>
                Sign In
              </Button>
            </Form>
          </div>
        </div>

        <div className={login.existingAccount}>
          <div className={login.or}>
            <span>OR</span>
          </div>
          <h2>Use an existing account</h2>
          <div className={login.socialBtn}>
            <a href="javascript:void(0)" className={login.facebook+' '+login.loginBtn} onClick={handleFacebookLogin}>
              <div>
                <div className={login.icon}></div>
                <span>Continue  with Facebook</span>
              </div>
            </a>
            <a href="javascript:void(0)" className={login.google + ' ' + login.loginBtn} onClick={handleGmailLogin}>
              <div>
                <div className={login.icon}></div>
                <span>Continue  with Google</span>
              </div>
            </a>
            <a href='' className={login.linkedin+' '+login.loginBtn}>
              <div>
                <div className={login.icon}></div>
                <span>Continue  with Linkedin</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Login;
