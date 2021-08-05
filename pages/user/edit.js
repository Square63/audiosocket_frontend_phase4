import withPrivateRoute from "../../components/withPrivateRoute";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Edit() {
  return (
    <div className="userContent">
      <Form className="profileEdit as-form-control">
        <div className="row">
          <div className="col-lg-6">
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Label className="required">Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
          </div>

          <div className="col-lg-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label className="required">New Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </div>

          <div className="col-lg-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter phone" />
            </Form.Group>
          </div>

          <div className="col-lg-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>organization</Form.Label>
              <Form.Control type="text" placeholder="Enter company name" />
            </Form.Group>
          </div>

          <div className="col-lg-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter here" />
            </Form.Group>
          </div>

          <div className="col-lg-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>city</Form.Label>
              <Form.Control type="text" placeholder="Enter city" />
            </Form.Group>
          </div>

          <div className="col-lg-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label className="required">Country</Form.Label>
              <Form.Control as="select" custom>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>
          </div>

          <div className="col-lg-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>postal code</Form.Label>
              <Form.Control type="text" placeholder="Enter code" />
            </Form.Group>
          </div>
          

          <div className="col-lg-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>Youtube URL</Form.Label>
              <Form.Control type="text" placeholder="Enter here" />
            </Form.Group>
          </div>

          <div className="col-md-12">
            <label>
              <Form.Label>White-listing enabled</Form.Label>
              <input type="checkbox"/>
              <input type="checkbox"/>
            </label>
          </div>

          <div className="col-md-12 mt-3">
            <Button className="userAccountBtn" type="submit">
              Save
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default withPrivateRoute(Edit);