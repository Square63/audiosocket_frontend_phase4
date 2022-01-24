import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState, useRef, useContext, useEffect} from "react";
import Link from "next/link"
import Select from "react-select";
import {useRouter} from "next/router";
import { connect, useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TOAST_OPTIONS } from '../common/api';
import {AuthContext} from "../store/authContext";
import { authSignup } from "../redux/actions/authActions";
import signup from "../styles/Signup.module.scss";
import { Alert } from 'react-bootstrap';
import { useCookie } from 'next-cookie'

function Signup() {
  const cookie = useCookie()
  const dispatch = useDispatch();
  const signUpUser = useSelector(state => state.auth);
  const { authActions } = useContext(AuthContext);
  const form = useRef(null);
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contentType, setContentType] = useState(false);
  const [contentTypeError, setContentTypeError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showError, setShowError] = useState(false);
  const contentTypeOptions = [
    {label: 'Ads', value: 'Ads'},
    {label: 'Branded Content', value: 'Branded Content'},
    {label: 'Films', value: 'Films'},
    {label: 'Editorials / News', value: 'Editorials / News'},
    {label: 'TV Programs Or Promos', value: 'TV Programs Or Promos'},
    {label: 'Radio Shows / Podcast', value: 'Radio Shows / Podcast'},
    {label: 'Wedding / Live Event Slideshow Or Video', value: 'Wedding / Live Event Slideshow Or Video'},
    {label: 'Student / Personal Video', value: 'Student / Personal Video'},
    {label: 'Vlog', value: 'Vlog'},
  ];

  useEffect(() => {
    if(localStorage.getItem('user')) {
      alert('Already logged in')
      router.push('/')
    }
  }, [])

  useEffect(() => {
    if(signUpUser?.error) {
      toast.error(signUpUser.error.email, TOAST_OPTIONS);
    } else if(Object.keys(signUpUser.user).length) {
      localStorage.setItem("user", JSON.stringify(signUpUser.user));
      cookie.set('user', JSON.stringify(loggedInUser.user))
      router.push('/selectPlan');
    }
  }, [signUpUser])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setConfirmPasswordError(false);
    const signupForm = e.currentTarget;
    const data = new FormData(form.current);
    if(data.get('password') !== data.get('confirm_password')) {
      setConfirmPasswordError(true);
      setIsLoading(false);
    }
    if (signupForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      setIsLoading(false);
    } else {
      let authData = {
				email: data.get("email"),
				first_name: data.get("first_name"),
				last_name: data.get("last_name"),
				password: data.get("password"),
				password_confirmation: data.get("confirm_password"),
				content_type: contentType,
			};
      dispatch(authSignup(authData));
    }
  }

  const handleConfirmPassword = () => {
    const data = new FormData(form.current);
    if(!data.get('confirm_password')) {
      setConfirmPasswordError(false);
      return;
    }
    if(data.get('password') !== data.get('confirm_password'))
      setConfirmPasswordError(true);
    else
      setConfirmPasswordError(false);
  }

  const handleSelectContentType = (target) => {
    setContentType(target.value);
  }
  return (
    <div className={signup.signupWrapper}>
      <div className={signup.signupHeading}>
        <h1>Sign Up</h1>
        <p>Already have an account?<Link href={"/login"}>Sign in</Link></p>
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
      <div className={signup.steps}>
        <ul>
          <li className={signup.active}>
            <span>1</span>Create Account
          </li>
          <li>
            <span>2</span>Select Plan
          </li>
          <li>
            <span>3</span>Setup Payment
          </li>
        </ul>
      </div>
      <div className={signup.useEmail}>
        <div className={signup.formwrapper}>
          <div className={signup.useEmail}>
            <h2>Create Account</h2>
            <div className={signup.wrapper}>
              <Form noValidate validated={validated} ref={form} onSubmit={handleSubmit}>
                <div className={signup.formWrapper}>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className={signup.fieldControl} controlId="formBasicEmail">
                        <Form.Control required name="first_name" type="text" placeholder="First Name" />
                        <Form.Control.Feedback type="invalid">
                          First name is required!
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className={signup.fieldControl} controlId="formBasicEmail">
                        <Form.Control required name="last_name" type="text" placeholder="Last Name" />
                        <Form.Control.Feedback type="invalid">
                          Last name is required!
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <Form.Group className={signup.fieldControl} controlId="formBasicEmail">
                        <Form.Control required name="email" type="email" placeholder="Email" />
                        <Form.Control.Feedback type="invalid">
                          A valid email address is required!
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className={signup.fieldControl} controlId="formBasicPassword">
                        <Form.Control required name="password" type="password" placeholder="Password" />
                        <Form.Control.Feedback type="invalid">
                          Password is required!
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className={signup.fieldControl} controlId="formBasicPassword">
                        <Form.Control className={confirmPasswordError ? "confirm_password invalid" : "confirm_password"} name="confirm_password" type="password" placeholder="Confirm Password" onChange={handleConfirmPassword} />
                        {confirmPasswordError &&
                        <small className="input-error">Password doesn&apos;t match!</small>
                        }
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <Form.Group>
                        <Select
                          isSearchable={false}
                          placeholder="What type of content do you create?"
                          className='react-select-container'
                          classNamePrefix="react-select"
                          options={contentTypeOptions}
                          onChange={handleSelectContentType}
                          noOptionsMessage={() => {return "No content type found"}}
                          theme={theme => ({
                            ...theme,
                            colors: {
                              ...theme.colors,
                              primary: '#c0d72d',
                            },
                            height: 34,
                          })}
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>
                <Button type="submit" className={signup.submit+' '+signup.signupBtn}>
                  Continue
                </Button>
              </Form>
            </div>
          </div>
          <div className={signup.existingAccount}>
            <div className={signup.or}>
              <span>OR</span>
            </div>
            <div className={signup.socialBtn}>
              <a href='' className={signup.facebook+' '+signup.signupBtn}>
                <div>
                  <div className={signup.icon}></div>
                  <span>Continue  with Facebook</span>
                </div>
              </a>
              <a href='' className={signup.google+' '+signup.signupBtn}>
                <div>
                  <div className={signup.icon}></div>
                  <span>Continue  with Google</span>
                </div>
              </a>
              <a href='' className={signup.apple+' '+signup.signupBtn}>
                <div>
                  <div className={signup.icon}></div>
                  <span>Continue  with Apple</span>
                </div>
              </a>
            </div>
          </div>
          <div className={signup.privacy}>
            By creating an account you agree to Audiosocket’s <Link href={"#"}>Terms of Use</Link> and <Link href={"#"}>Privacy Policy.</Link>
          </div>
        </div>
      </div> 
    </div>
  );

}

export default Signup;
