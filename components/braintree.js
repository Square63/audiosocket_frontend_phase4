import axios from "axios";
import React from "react";
import DropIn from "braintree-web-drop-in-react";
import { BraintreeHostedFields } from 'braintree-web-react'
import signup from "../styles/Signup.module.scss";
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import cardServices from '../images/cardServices.svg';
import InpageLoader from './InpageLoader';
import {AuthContext} from "../store/authContext";
import router from "next/router";
import { toast } from 'react-toastify';


class Braintree extends React.Component {
  static contextType = AuthContext;

  instance;

  state = {
    clientToken: null,
    invoice: null,
    redirectUrl: null,
    error: null
  };

  async componentDidMount() {
    // Get a client token for authorization from your server
    const context = this.context;
    console.log("TOTAL PRICE", context.totalCartPrice)
    const authToken = JSON.parse(localStorage.getItem("user") ?? "");
    let url = `https://artist-portal-backend-phase4.square63.net/api/v1/consumer/checkout/new?transaction_amount=${this.props.transactionAmount}`
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
      invoice: data.invoice,
      redirectUrl: data.redirect_url,
      error: data.error
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
      const context = this.context;
      const { nonce } = await this.instance.tokenize()
      let transaction_amount =  context.totalCartPrice;
      let discount_id = 'OTTDD';
      const authToken = JSON.parse(localStorage.getItem("user") ?? "");
      const response = await axios.post(
        this.state.redirectUrl, { nonce, transaction_amount, discount_id },
        {
          headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
            'auth-token': authToken
          }
        }
      )
      if (!response.status === 200) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        this.sendToHomePage();
      }
    } catch (err) {
      toast.error('Error in payment process.');
    }
  }

  sendToHomePage() {
    this.context.resetCartCount()
    router.push('/');
  }

  render() {
    if (this.state.error == "Cart is not present"){
      return this.sendToHomePage()
    } else if (this.state.invoice) {
      return (
        <div>
          <a href={this.state.invoice} target="_blank" rel="noreferrer" onClick={this.sendToHomePage()}>View Invoice</a>
        </div>
      );
    } else if (!this.state.clientToken){
      return (
        <div>
          <InpageLoader />
        </div>
      );
    } else {
      return (
        <div className="container">
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
                      <label className="hosted-fields--label">Card Number</label>
                      <div className="form-control hosted-field" id="card-number" type="text" placeholder="Enter Card Number…"></div>

                      <label className="hosted-fields--label">Expiration Date</label>
                      <div className="form-control hosted-field" type="text" placeholder="Expiration Date (MM/YY)" id="expiration-date"></div>

                      <label className="hosted-fields--label">CVV</label>
                      <div className="form-control hosted-field" type="text" placeholder="CVV" id="cvv"></div>
                      <label className="hosted-fields--label">Postal Code</label>
                      <div id="postal-code" className="form-control hosted-field" type="text" placeholder="Enter Postal Code."></div>
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

export default Braintree;
