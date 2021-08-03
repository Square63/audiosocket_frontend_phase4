import withPrivateRoute from "../../components/withPrivateRoute";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

function Edit() {
  return (
    <div className="userContent">
      <Form className="profileEdit">
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </div>

          

          <div className="col-md-12">
            <Form.Group className="" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
          </div>
          <div className="col-md-12">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </Form>
      <div className="row">
        <div className="col-md-6">
          <div class="form-group">
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default withPrivateRoute(Edit);