import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState, useRef, useContext, useEffect} from "react";
import {AuthContext} from "../store/authContext";
import {useRouter} from "next/router";
import signup from "../styles/Signup.module.scss";
import Select from "react-select";
import Link from "next/link"

function Signup() {
  const { authActions } = useContext(AuthContext);
  const form = useRef(null);
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contentType, setContentType] = useState(false);
  const [contentTypeError, setContentTypeError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
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
      authActions.userDataStateChanged(data.get('email'));
      e.target.reset();
      router.push('/');
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
        <h1>sign up</h1>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className={signup.existingAccount}>
            <h2>Use an existing account</h2>
            <div className={signup.socialBtn}>
              <a href='' className={signup.facebook+' '+signup.signupBtn}>facebook</a>
              <a href='' className={signup.google+' '+signup.signupBtn}>google</a>
              <a href='' className={signup.linkedin+' '+signup.signupBtn}>linkedin</a>
            </div>
          </div>
        </div>
        <div className="col-md-6 signupSeprator">
          <div className={signup.useEmail}>
            <h2>Use your email address</h2>
            <Form noValidate validated={validated} ref={form} onSubmit={handleSubmit}>
              <div className={signup.formWrapper}>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className={signup.fieldControl} controlId="formBasicEmail">
                      <Form.Control required name="first_name" type="text" placeholder="First Name*" />
                      <Form.Control.Feedback type="invalid">
                        First name is required!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className={signup.fieldControl} controlId="formBasicEmail">
                      <Form.Control required name="last_name" type="text" placeholder="Last Name*" />
                      <Form.Control.Feedback type="invalid">
                        Last name is required!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <Form.Group className={signup.fieldControl} controlId="formBasicEmail">
                      <Form.Control required name="email" type="email" placeholder="Email*" />
                      <Form.Control.Feedback type="invalid">
                        A valid email address is required!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className={signup.fieldControl} controlId="formBasicPassword">
                      <Form.Control required name="password" type="password" placeholder="Password*" />
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
                        className={"content-type-select-container-header"}
                        classNamePrefix="content-type-select-header"
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
                Sign up
              </Button>
            </Form>
          </div>
        </div>
        <div className={signup.loginText}>
          <p>Are you an existing user? <Link href={"/login"}>Log in</Link></p>
        </div>
      </div>
    </div>
  );

}

export default Signup;
