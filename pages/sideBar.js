import signup from "../styles/Signup.module.scss";
import pricing from "../styles/Pricing.module.scss";
import { Form, Button, Carousel, FormGroup, FormControl, Row, Col, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
function SideBar() {
  
  const handleSidebarShow = () => {
    document.getElementById("offcanvasRight").classList.add("show");
    document.getElementsByClassName("sidebarBackdrop")[0].classList.add("active");
    document.body.classList.add('overflow-hidden');
  }
  const handleSidebarHide = () => {
    document.getElementById("offcanvasRight").classList.remove("show");
    document.getElementsByClassName("sidebarBackdrop")[0].classList.remove("active");
    document.body.classList.remove('overflow-hidden');
  }
  
  
  return (
    <div>
      <a href="javascript:void(0)" className="btn btnMainLarge" onClick={() => handleSidebarShow()}>Launch</a>
      <div className="sidebarBackdrop" onClick={() => handleSidebarHide()}></div>
      <div className="offcanvas offcanvas-end" id="offcanvasRight">
        <div className="offcanvasHeader">
          <a href="javascript:void(0)" className="btnClose" onClick={() => handleSidebarHide()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16.121" height="16.121" viewBox="0 0 16.121 16.121">
            <g id="Group_112" data-name="Group 112" transform="translate(-11680.439 270.061)">
              <g id="Group_80" data-name="Group 80" transform="translate(129 1304.5)">
                <line id="Line_70" data-name="Line 70" x1="14" y2="14" transform="translate(11552.5 -1573.5)" fill="none" stroke="#707070" strokeWidth="3"/>
                <line id="Line_71" data-name="Line 71" x2="14" y2="14" transform="translate(11552.5 -1573.5)" fill="none" stroke="#707070" strokeWidth="3"/>
              </g>
            </g>
          </svg>

          </a>
        </div>
        <div className="offcanvas-body">
          {/* Sign Up Form */}
          {/* <div className={signup.sidebarDeviseForm}>
            <h2 className="offcanvasHeading">Sign Up</h2>
            <p className="offcanvasDesc">Already have an account? <a href="javascript:void(0)">Sign In</a></p>
            <div className={pricing.formWrapper}>
              <h3>Create Account</h3>
              <Form className={pricing.sidebarForm}>
                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Control type="text" placeholder="Enter Name" />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Control type="text" placeholder="Enter Last Name" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mt-2 text-center">
                  <Button variant="link" className="btn btnMainLarge" type="submit">
                    <span>Continue</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.414" height="13.328" viewBox="0 0 16.414 13.328">
                      <g id="icon-arrow-down" transform="translate(1 11.914) rotate(-90)">
                        <path id="Shape_1938" data-name="Shape 1938" d="M334.432,2393.5v14" transform="translate(-329.182 -2393.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        <path id="Shape_1939" data-name="Shape 1939" d="M337.432,2402.5l-5.25-5.25" transform="translate(-332.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                        <path id="Shape_1940" data-name="Shape 1940" d="M334.432,2402.5l5.25-5.25" transform="translate(-329.182 -2388.497)" fill="none" stroke="#313438" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                      </g>
                    </svg>
                  </Button>
                </div>
              </Form>
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
          </div> */}

          {/* Sign In Form */}
          <div className={signup.sidebarDeviseForm}>
            <h2 className="offcanvasHeading">Sign In</h2>
            <p className="offcanvasDesc">Don’t have an account yet? <a href="javascript:void(0)">Sign Up</a></p>
            <div className={pricing.formWrapper}>
              <h3>Create Account</h3>
              <Form className={pricing.sidebarForm}>
                <Row>
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mt-2 text-center">
                  <Button variant="link" className="btn btnMainLarge" type="submit">
                    <span>Sign In</span>
                  </Button>
                </div>
              </Form>
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
          </div>
        </div>
      </div>

    </div>
  );
}

export default SideBar;