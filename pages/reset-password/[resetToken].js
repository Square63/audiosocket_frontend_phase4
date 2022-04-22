import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import login from "../../styles/Login.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/actions/authActions";
import { useRouter } from "next/router";
import { Router } from "react-router";

function ForgotPasswordModal({ showModal = false, onCloseModal }) {
  const dispatch = useDispatch();
  const form = useRef(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmError, setIsConfirmError] = useState(false);
  const router = useRouter();
  const token = router.query.resetToken;

  const handleSubmit = async (e) => {
    const data = new FormData(form.current);
    e.preventDefault();
    setIsLoading(true);
    const forgotPasswordForm = e.currentTarget;
    if (forgotPasswordForm.checkValidity() === false || isConfirmError) {
      e.preventDefault();
      e.stopPropagation();
      setIsLoading(false);
    } else {
      let passwordData = {
        password: data.get("password"),
        password_confirmation: data.get("confirm_password"),
        reset_password_token: token,
      };
      dispatch(resetPassword(passwordData));
      setIsLoading(false);
      e.target.reset();
      handleClose();
      router.push("/login");
    }
  };

  const handleConfirmPassword = () => {
    const data = new FormData(form.current);
    if (!data.get("confirm_password")) {
      setIsConfirmError(false);
      return;
    }
    if (data.get("password") !== data.get("confirm_password"))
      setIsConfirmError(true);
    else setIsConfirmError(false);
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
          <h2 className="modalName">Reset Password</h2>
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
                  <Form.Control
                    onChange={handleConfirmPassword}
                    required
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                  />
                  <Form.Control.Feedback type="invalid">
                    A valid password is required!
                  </Form.Control.Feedback>
                </div>
                <div className="form-group">
                  <Form.Group
                    className={isConfirmError && "invalid"}
                    controlId="formBasicPasswordConfirm"
                  >
                    <Form.Control
                      onChange={handleConfirmPassword}
                      required
                      name="confirm_password"
                      type="password"
                      placeholder="Confirm Password"
                    />
                    {!isConfirmError && (
                      <Form.Control.Feedback type="invalid">
                        Confirm Password is required!
                      </Form.Control.Feedback>
                    )}
                    {isConfirmError && (
                      <small className="invalid">Passwords don't match</small>
                    )}
                  </Form.Group>
                  <Form.Control.Feedback type="invalid">
                    Passwords do not match!
                  </Form.Control.Feedback>
                </div>
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
