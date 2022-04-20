import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import login from "../styles/Login.module.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/actions/authActions";

function ForgotPasswordModal({showModal = false, onCloseModal}) {
  const dispatch = useDispatch()
  const form = useRef(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const forgotPasswordForm = e.currentTarget;
    if (forgotPasswordForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      setIsLoading(false);
    } else {
      const data = form.current.email.value;
      dispatch(forgotPassword(data))
      setIsLoading(false);
      e.target.reset();
      handleClose();
      alert('email sent');
    }
  }

  const handleClose = () => {
    setValidated(false);
    setIsLoading(false);
  }

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
          <Form className="forgot-password-form" noValidate validated={validated} ref={form} onSubmit={handleSubmit}>
            <div className="modal-container">
              <div className="form-group">
                <Form.Label className="required">Get a link to reset your password on your email</Form.Label>
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
            <Button type="submit" className={login.submit+' '+login.loginBtn}>
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