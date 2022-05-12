import { Button, Carousel, FormGroup, FormControl, Row, Col, ControlLabel, Dropdown, DropdownButton, CloseButton } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import React from "react";
import {withRouter} from 'next/router';
import { BraintreeHostedFields } from 'braintree-web-react'
import signup from "../styles/Signup.module.scss";
import Image from 'next/image';
import cardServices from '../images/cardServices.svg';
import InpageLoader from '../components/InpageLoader';
import pricing from "../styles/Pricing.module.scss";
import { TOAST_OPTIONS } from '../common/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Braintree extends React.Component {
  instance;


  state = {
    clientToken: null,
    redirectUrl: null
  };

  async componentDidMount() {
    // Get a client token for authorization from your server
    let planId = parseInt(this.props.planId)
    const transactionType = "subscription";
    const authToken = JSON.parse(localStorage.getItem("user") ?? "");

    let url  = `https://artist-portal-backend-phase4.square63.net/api/v1/consumer/payments/new?plan_id=${planId}&transaction_type=${transactionType}`
    const response = await fetch(url, {
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
        'auth-token': authToken
      }
    });
    const data = await response.json();
    const clientToken = data.token
    this.setState({
      clientToken: clientToken,
      redirectUrl: data.redirect_url 
    });
  }

  async buy() {
    // Send the nonce to your server
    const { nonce } = await this.instance.requestPaymentMethod();
    await fetch(`server.test/purchase/${nonce}`);
  }

  async purchase() {
    try {
      // Send nonce to your server
      const { nonce } = await this.instance.tokenize()
      let discount_id = document.getElementById("disCode").value;
      const authToken = JSON.parse(localStorage.getItem("user") ?? "");
      const response = await axios.post(
        this.state.redirectUrl, { nonce, discount_id },
        {
          headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
            'auth-token': authToken
          }
        }
      )
      toast.success(response.data.message)
      window.location.href = "/"
    } catch (err) {
      console.error(err)
      toast.error("Subscription already exists. Please cancel your current subscription first.")
    }
  }

  render() {
    
    if (!this.state.clientToken) {
      return (
        <div>
          <InpageLoader/>
        </div>
      );
    } else {
      console.log(this.instance);
      return (
        <div className="container">
          <BraintreeHostedFields
            className="drop-in-container"
            options={{
              authorization: this.state.clientToken
            }}
            onInstance={(instance) => (this.instance = instance)}
          >   
            <form id="cardForm">
            
                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Label>Name on Card</Form.Label>
                      <Form.Control type="text" placeholder="Enter Name" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Label className="hosted-fields--label">Card Number</Form.Label>
                      {/* <Form.Control className="form-control hosted-field" id="card-number" type="text" placeholder="Enter Card Number" /> */}
                      <div className="form-control hosted-field" id="card-number" type="text" placeholder="Enter Card Number…"></div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Label className="hosted-fields--label">Postal Code</Form.Label>
                      <div id="postal-code" className="form-control hosted-field" type="text" placeholder="Enter Postal Code."></div>
                      {/* <Form.Control id="postal-code" className="form-control hosted-field" type="text" placeholder="Enter Postal Code." /> */}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="halfGutters">
                  <Col sm={6} xs={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="hosted-fields--label">Expiry Date</Form.Label>
                      <div className="form-control hosted-field" type="text" placeholder="Expiration Date (MM/YY)" id="expiration-date"></div>
                      {/* <Form.Control className="form-control hosted-field" id="expiration-date" type="text" placeholder="MM/YY" /> */}
                    </Form.Group>
                  </Col>

                  <Col sm={6} xs={12}>
                    <Form.Group className="mb-4">
                      <Form.Label className="hosted-fields--label">Security Code</Form.Label>
                      {/* <Form.Control className="form-control hosted-field" type="text" placeholder="CVV" id="cvv" /> */}
                      <div className="form-control hosted-field" type="text" placeholder="CVV" id="cvv"></div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="halfGutters">
                  <Col>
                    <Form.Group className="mb-4">
                      <Form.Label>Apply Discount Code</Form.Label>
                      <div className="stickySearch discountCode">
                        <Form.Control id="disCode" type="text" placeholder="Enter Code" />
                        <Button variant="default" type="submit" className="btnMainLarge stickyBtn">Apply</Button>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <p className={pricing.paymentSetupNotice}>By clicking the “Start Membership” button, you agree to our Terms of License and Privacy Policy and that Audiosocket will automatically continue your membership and charge the membership fee on a monthly/annual basis (depending on the plan they selected) until you cancel.</p>
                <div className={signup.btnWrapper}>
                  <a href="javascript:void(0)" className="btn btnMainLarge submit" onClick={this.purchase.bind(this)}>Start Membership</a>
                  {/* <button className="btn btnMainLarge submit" onClick={this.purchase.bind(e, this)}>Start Membership</button> */}
                </div>
              
                {/* <label className="hosted-fields--label">Card Number</label>
              <div className="form-control hosted-field" id="card-number" type="text" placeholder="Enter Card Number…"></div>
              <label className="hosted-fields--label">Expiration Date</label>
              <div className="form-control hosted-field" type="text" placeholder="Expiration Date (MM/YY)" id="expiration-date"></div>

              <label className="hosted-fields--label">CVV</label>
              <div className="form-control hosted-field" type="text" placeholder="CVV" id="cvv"></div>
              <label className="hosted-fields--label">Postal Code</label>
              <div id="postal-code" className="form-control hosted-field" type="text" placeholder="Enter Postal Code."></div>
              <label>Discount Code</label>
              <input id="disCode" className="form-control" type="text" placeholder="Enter Discount Code." /> */}
            </form>
            
          {/* <div className={signup.btnWrapper}>
            <button className="btn btnMainLarge submit" onClick={this.purchase.bind(this)}>Submit</button>
          </div> */}
                
          </BraintreeHostedFields><br></br>
        </div>
      );
    }
  }
}

export default withRouter(Braintree);