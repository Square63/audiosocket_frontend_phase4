import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import {withRouter} from 'next/router';

import DropIn from "braintree-web-drop-in-react";
import { BraintreeHostedFields } from 'braintree-web-react'
import signup from "../styles/Signup.module.scss";
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import cardServices from '../images/cardServices.svg';
import InpageLoader from '../components/InpageLoader';
import BASE_URL from '../common/api'
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
		let planId = 1
    const transactionType = "subscription";
    const authToken = JSON.parse(localStorage.getItem("user") ?? "");

    let url  = `https://artist-portal-backend-phase4.square63.net/api/v1/consumer/payments/new?plan_id=${planId}&transaction_type=${transactionType}`
    const response = await fetch(url, {
      headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
        'auth-token': authToken
      }
    });
    debugger
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
    const { nonce } = await this.instance.tokenize()
		debugger
    const authToken = JSON.parse(localStorage.getItem("user") ?? "");
    await axios.patch(
      "https://artist-portal-backend-phase4.square63.net/api/v1/consumer/payment_method", { nonce },
      {
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
          'auth-token': authToken
        }
      }
    ).then(response => {
      toast.success("Card updated successfully.")
      localStorage.setItem("has_subscription", true);
      window.location.href = "/user/edit"
    }).catch(error => {
      toast.error(error.response.data.message);
    });
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
          <BraintreeHostedFields
            className="drop-in-container"
            options={{
              authorization: this.state.clientToken
            }}
            onInstance={(instance) => (this.instance = instance)}
          >

          <div className={signup.stepWrapper+" "+signup.stepThreeWrapper}>
            <div className="fixed-container">
              <div className={signup.signUpInner}>

                <div className={signup.signupBodyWrapper}>
                  <div className="boxWithShadow">
                    <div className="boxHeading">
                      <span>Pay with credit card</span>
                      <Image src={cardServices} alt="Credit Card"/>
                    </div>
                    <div className={signup.boxBody}>
                    <form id="cardForm">
                      <div className="form-group">
                        <label className="hosted-fields--label form-label">Card Number <sup>*</sup></label>
                        <div className="form-control hosted-field" id="card-number" type="text" placeholder="Enter Card Number…"></div>
                      </div>

                      <div className="form-group">
                        <label className="hosted-fields--label form-label">Expiration Date <sup>*</sup></label>
                        <div className="form-control hosted-field" type="text" placeholder="Expiration Date (MM/YY)" id="expiration-date"></div>
                      </div>

                      <div className="form-group">
                        <label className="hosted-fields--label form-label">CVV <sup>*</sup></label>
                        <div className="form-control hosted-field" type="text" placeholder="CVV" id="cvv"></div>
                      </div>
                      <div className="form-group">
                        <label className="hosted-fields--label form-label">Postal Code <sup>*</sup></label>
                        <div id="postal-code" className="form-control hosted-field" type="text" placeholder="Enter Postal Code."></div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Discount Code</label>
                        <input id="disCode" className="form-control" type="text" placeholder="Enter Discount Code." />
                      </div>
                    </form>
                    </div>
                  </div>
                  <div className={signup.btnWrapper}>
                    <button className="btn btnMainLarge submit" onClick={this.purchase.bind(this)}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </BraintreeHostedFields><br></br>
        </div>
      );
    }
  }
}

export default withRouter(Braintree);
