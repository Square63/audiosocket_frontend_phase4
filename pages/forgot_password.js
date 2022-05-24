import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import login from "../styles/Login.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/actions/authActions";
import { useRouter } from "next/router";
import Notiflix from "notiflix";

function ForgotPasswordModal({ showModal = false, onCloseModal }) {
  const dispatch = useDispatch();
  const form = useRef(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const confirmationModal = useSelector( state => state.auth.forgot_password)
  const router = useRouter();

  useEffect(() => {
    if ((confirmationModal == true) && (email.length > 0)) {
      Notiflix.Report.success( 'Success', `Password reset link sent to ${email}`, 'Ok', () => {
        window.location = '/login'
      } );
    } else if ((confirmationModal == false) && (email.length > 0)) {
      Notiflix.Report.failure( 'Invalid user', `User "${email}" doesn't exist, please enter a valid email address.`, 'Ok', () => {
        window.location.reload();
      } );
    }
  }, [confirmationModal])

  const handleSubmit = async (e) => {
    const data = new FormData(form.current);
    e.preventDefault();
    setIsLoading(true);
    const forgotPasswordForm = e.currentTarget;
    if (forgotPasswordForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      setIsLoading(false);
    } else {
      setEmail(data.get("email"))
      let email = {
        email: data.get("email"),
      };
      dispatch(forgotPassword(email));
      setIsLoading(false);
      e.target.reset();
      handleClose();
    }
  };

  const handleClose = () => {
    setValidated(false);
    setIsLoading(false);
  };

  return (
    <div className={login.loginWrapper}>
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
          <h2 className="modalName">Forgot Password</h2>
          <div className={login.wrapper}>
            <Form
              className="forgot-password-form"
              noValidate
              validated={validated}
              ref={form}
              onSubmit={handleSubmit}
            >
              <div className="modal-container">
                <div className="form-group">
                  <Form.Label className="required">
                    Get a link to reset your password on your email
                  </Form.Label>
                  <Form.Control
                    required
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                  <Form.Control.Feedback type="invalid">
                    A valid email address is required!
                  </Form.Control.Feedback>
                </div>
              </div>
              <div>
                <a href="javascript:void(0)" className="backToHeaven">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16.414" height="13.328" viewBox="0 0 16.414 13.328">
                    <g id="icon-arrow-down" transform="translate(15.414 1.414) rotate(90)">
                      <path id="Shape_1938" data-name="Shape 1938" d="M334.432,2393.5v14" transform="translate(-329.182 -2393.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                      <path id="Shape_1939" data-name="Shape 1939" d="M337.432,2402.5l-5.25-5.25" transform="translate(-332.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                      <path id="Shape_1940" data-name="Shape 1940" d="M334.432,2402.5l5.25-5.25" transform="translate(-329.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                    </g>
                  </svg>
                  <Link href="#">
                    <a onClick={() => {router.push('/login')}}>Back to Login</a>
                  </Link>
                </a>
              </div>
              <Button
                type="submit"
                className={login.submit + " " + login.loginBtn}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
