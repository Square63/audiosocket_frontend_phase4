import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";
import { updatePassword } from "../../redux/actions/authActions";

import {LoaderImage} from "../LoaderImage";

function Security() {
  const dispatch = useDispatch();
  const updatedPassword = useSelector(state => state.user);

  useEffect(() => {
    setIsLoading(false)
  }, [updatedPassword])

  const form = useRef(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const securityForm = e.currentTarget;
    const data = new FormData(form.current);
    if (securityForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      setIsLoading(false);
    } else {
      let updatePasswordData = {
				current_password: data.get("current_password"),
				new_password: data.get("new_password"),
				confirm_password: data.get("confirm_password")
			};
      dispatch(updatePassword(updatePasswordData));
    }
  };

  return (
    <Form
      className="security-form"
      noValidate
      validated={validated}
      ref={form}
      onSubmit={handleSubmit}
    >
      <div className="modal-container">
        <div className="form-group">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            required
            name="current_password"
            type="password"
            placeholder="Enter Current Password..."
          />
          <Form.Control.Feedback type="invalid">
            Current password is required!
          </Form.Control.Feedback>
        </div>
        <div className="form-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            name="new_password"
            type="password"
            placeholder="Enter New Password..."
          />
          <Form.Control.Feedback type="invalid">
            New password is required!
          </Form.Control.Feedback>
        </div>
        <div className="form-group">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            name="confirm_password"
            type="password"
            placeholder="Enter Password Again..."
          />
          <Form.Control.Feedback type="invalid">
            Confirm password is required!
          </Form.Control.Feedback>
        </div>
      </div>
      <div className="col-md-12 pt-3 text-center">
        <Button variant="link" type="submit" className="btnMainLarge submit">
          {isLoading ? (
            <>
              Updating...
              <Image loader={LoaderImage} src={Loader} alt="icon" />
            </>
          ) : (
            "Update Password"
          )}
        </Button>
      </div>
    </Form>
  );
}

export default Security;
