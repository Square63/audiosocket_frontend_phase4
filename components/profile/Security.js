import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Loader from "../../images/loader.svg";

function Security() {
  const form = useRef(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const securityForm = e.currentTarget;
    if (securityForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      setIsLoading(false);
    } else {
      const data = new FormData(form.current);
      setIsLoading(false);
      e.target.reset();
      alert("updated");
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
          <Form.Control
            required
            name="username"
            type="text"
            value="ahmed.raza"
            disabled
            readOnly
          />
          <Form.Control.Feedback type="invalid">
            Current password is required!
          </Form.Control.Feedback>
        </div>
        <div className="form-group">
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
      </div>
      <Button type="submit" className="btn primary-btn submit">
        {isLoading ? (
          <>
            Updating...
            <Image loader={LoaderImage} src={Loader} alt="icon" />
          </>
        ) : (
          "Update Password"
        )}
      </Button>
    </Form>
  );
}

export default Security;
