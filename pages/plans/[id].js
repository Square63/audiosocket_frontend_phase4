import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import {withRouter} from 'next/router';

import DropIn from "braintree-web-drop-in-react";
import { BraintreeHostedFields } from 'braintree-web-react'
import signup from "../../styles/Signup.module.scss";
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import cardServices from '../../images/cardServices.svg';
import InpageLoader from '../../components/InpageLoader';
import { BASE_URL } from "../../common/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pricing from "../../styles/Pricing.module.scss";


class Braintree extends React.Component {
  instance;


  state = {
    clientToken: null,
    redirectUrl: null,
    paypal: false
  };

  async componentDidMount() {
    // Get a client token for authorization from your server
    let planId = parseInt(this.props.router.query.id)
    const transactionType = "subscription";
    const authToken = JSON.parse(localStorage.getItem("user") ?? "");

    let url  = `${BASE_URL}/api/v1/consumer/payments/new?plan_id=${planId}&transaction_type=${transactionType}`
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
    let discount_id = document.getElementById("disCode").value;
    const authToken = JSON.parse(localStorage.getItem("user") ?? "");
    const queryParams = new URLSearchParams(window.location.search);
    const yearly = queryParams.get('yearly');
    await axios.post(
      this.state.redirectUrl, { nonce, discount_id, switch_to_yearly: (yearly === 'true') },
      {
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
          'auth-token': authToken
        }
      }
    ).then(response => {
      toast.success(response.data.message)
      localStorage.setItem("has_subscription", true);
      window.location.href = "/"
    }).catch(error => {
      toast.error(error.response.data.message);
    });
  }

  async purchase(type) {
    const { nonce } = type == "paypal" ? await this.instance.requestPaymentMethod() : await this.instance.tokenize()
    let discount_id = document.getElementById("disCode")?.value;
    const authToken = JSON.parse(localStorage.getItem("user") ?? "");
    const queryParams = new URLSearchParams(window.location.search);
    const yearly = queryParams.get('yearly');
    await axios.post(
      this.state.redirectUrl, { nonce, discount_id, switch_to_yearly: (yearly === 'true') },
      {
        headers: {
          'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJhcHBfaWQiOiJhcnRpc3RzLXBvcnRhbC1iYWNrZW5kIn0.etBLEBaghaQBvyYoz1Veu6hvJBZpyL668dfkrRNLla8',
          'auth-token': authToken
        }
      }
    ).then(response => {
      toast.success(response.data.message)
      localStorage.setItem("has_subscription", true);
      window.location.href = "/"
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
            <div className={pricing.plansPayment}>
              <a href="javascript:void(0)" className={`${pricing.creditCardBtn} btn btnMainOutline ${!this.state.paypal ? "activate" : ""}`} onClick={() => this.setState({paypal: false})}>Credit Card</a>
              <a href="javascript:void(0)" className={`${pricing.payPalBtn} btn btnMainOutline ${this.state.paypal ? "activate" : ""}`} onClick={() => this.setState({paypal: true})}>
                <svg id="paypal-logo-vector" xmlns="http://www.w3.org/2000/svg" width="94.62" height="24" viewBox="0 0 94.62 24">
                  <g id="Group_52" data-name="Group 52">
                    <path id="Path_60" data-name="Path 60" d="M30.473-88.961c-1.111-1.267-3.12-1.81-5.69-1.81H17.324a1.068,1.068,0,0,0-1.056.9l-3.1,19.7a.64.64,0,0,0,.146.516.64.64,0,0,0,.487.224h4.6l1.156-7.335-.036.23a1.065,1.065,0,0,1,1.051-.9h2.188c4.3,0,7.664-1.746,8.647-6.8q.044-.224.076-.437a4.77,4.77,0,0,0-1.012-4.288" transform="translate(-13.156 90.771)" fill="#003087"/>
                    <path id="Path_61" data-name="Path 61" d="M225.5-66.052c-.281,1.848-1.693,1.848-3.058,1.848h-.777l.545-3.451a.429.429,0,0,1,.424-.362h.357c.929,0,1.807,0,2.26.529a1.721,1.721,0,0,1,.25,1.435m-.594-4.822h-5.149a.717.717,0,0,0-.708.6l-2.081,13.2a.43.43,0,0,0,.1.345.43.43,0,0,0,.326.151h2.642a.5.5,0,0,0,.495-.422l.591-3.744a.716.716,0,0,1,.706-.6h1.629c3.392,0,5.349-1.64,5.861-4.894a3.965,3.965,0,0,0-.657-3.323,4.776,4.776,0,0,0-3.753-1.316" transform="translate(-151.812 77.235)" fill="#009cde"/>
                    <path id="Path_62" data-name="Path 62" d="M110.613-66.052c-.281,1.848-1.693,1.848-3.058,1.848h-.777l.545-3.451a.429.429,0,0,1,.424-.362h.356c.929,0,1.807,0,2.26.529a1.718,1.718,0,0,1,.25,1.435m-.594-4.822H104.87a.716.716,0,0,0-.707.6l-2.081,13.2a.429.429,0,0,0,.1.346.429.429,0,0,0,.326.15h2.459a.716.716,0,0,0,.706-.6l.562-3.562a.715.715,0,0,1,.706-.6h1.629c3.392,0,5.349-1.641,5.861-4.895a3.965,3.965,0,0,0-.657-3.323,4.776,4.776,0,0,0-3.753-1.316m11.954,9.563a2.75,2.75,0,0,1-2.783,2.355,2.081,2.081,0,0,1-1.656-.666,2.093,2.093,0,0,1-.386-1.731,2.759,2.759,0,0,1,2.763-2.373,2.078,2.078,0,0,1,1.644.672,2.122,2.122,0,0,1,.418,1.743m3.436-4.8h-2.466a.43.43,0,0,0-.425.363l-.108.689-.173-.25a3.51,3.51,0,0,0-2.912-1.034,5.67,5.67,0,0,0-5.5,4.959,4.655,4.655,0,0,0,.918,3.789,3.858,3.858,0,0,0,3.1,1.253,4.721,4.721,0,0,0,3.414-1.41l-.11.685a.429.429,0,0,0,.1.346.429.429,0,0,0,.327.15h2.22a.716.716,0,0,0,.707-.6l1.333-8.44a.43.43,0,0,0-.1-.346.43.43,0,0,0-.327-.15" transform="translate(-73.651 77.235)" fill="#003087"/>
                    <path id="Path_63" data-name="Path 63" d="M261.7-51.668a2.75,2.75,0,0,1-2.783,2.355,2.081,2.081,0,0,1-1.656-.666,2.093,2.093,0,0,1-.386-1.731,2.758,2.758,0,0,1,2.763-2.373,2.078,2.078,0,0,1,1.644.672,2.122,2.122,0,0,1,.418,1.743m3.436-4.8h-2.466a.429.429,0,0,0-.425.363l-.108.689-.173-.25a3.51,3.51,0,0,0-2.912-1.034,5.671,5.671,0,0,0-5.5,4.959,4.655,4.655,0,0,0,.919,3.789,3.858,3.858,0,0,0,3.1,1.253,4.722,4.722,0,0,0,3.414-1.41l-.11.685a.428.428,0,0,0,.1.346.428.428,0,0,0,.326.15h2.219a.717.717,0,0,0,.708-.6l1.333-8.44a.429.429,0,0,0-.1-.346.43.43,0,0,0-.327-.15" transform="translate(-176.655 67.591)" fill="#009cde"/>
                    <path id="Path_64" data-name="Path 64" d="M191.7-55.974h-2.479a.713.713,0,0,0-.591.314l-3.419,5.035-1.449-4.838a.717.717,0,0,0-.686-.511h-2.436a.43.43,0,0,0-.349.18.43.43,0,0,0-.057.389l2.728,8.01-2.566,3.621a.43.43,0,0,0-.03.445.43.43,0,0,0,.381.232h2.476a.717.717,0,0,0,.588-.307l8.241-11.9a.429.429,0,0,0,.028-.443.429.429,0,0,0-.38-.23" transform="translate(-126.807 67.098)" fill="#003087"/>
                    <path id="Path_65" data-name="Path 65" d="M294.534-70.51,292.42-57.066a.429.429,0,0,0,.1.346.429.429,0,0,0,.326.15h2.125a.716.716,0,0,0,.707-.6l2.084-13.2a.429.429,0,0,0-.1-.346.429.429,0,0,0-.327-.15h-2.378a.428.428,0,0,0-.424.362" transform="translate(-203.145 77.234)" fill="#009cde"/>
                    <path id="Path_66" data-name="Path 66" d="M30.473-88.961c-1.111-1.267-3.12-1.81-5.69-1.81H17.324a1.068,1.068,0,0,0-1.056.9l-3.1,19.7a.64.64,0,0,0,.146.516.64.64,0,0,0,.487.224h4.6l1.156-7.335-.036.23a1.065,1.065,0,0,1,1.051-.9h2.188c4.3,0,7.664-1.746,8.647-6.8q.044-.224.076-.437a4.77,4.77,0,0,0-1.012-4.288" transform="translate(-13.156 90.771)" fill="#003087"/>
                    <path id="Path_67" data-name="Path 67" d="M20.8-84.646a.935.935,0,0,1,.922-.788h5.847a12.294,12.294,0,0,1,1.929.139,8.1,8.1,0,0,1,.956.214,5.282,5.282,0,0,1,1.03.41,4.767,4.767,0,0,0-1.011-4.289c-1.112-1.266-3.12-1.809-5.69-1.809H17.322a1.068,1.068,0,0,0-1.054.9l-3.106,19.7a.64.64,0,0,0,.145.516.64.64,0,0,0,.487.224H18.4l1.156-7.336Z" transform="translate(-13.154 90.769)" fill="#003087"/>
                    <path id="Path_68" data-name="Path 68" d="M41.953-71.7q-.034.219-.076.437c-.983,5.05-4.349,6.8-8.647,6.8H31.041a1.064,1.064,0,0,0-1.05.9l-1.121,7.1-.319,2.015a.56.56,0,0,0,.127.452.56.56,0,0,0,.426.2h3.882a.934.934,0,0,0,.922-.788l.038-.2.732-4.636.046-.256a.934.934,0,0,1,.923-.788h.581c3.76,0,6.7-1.527,7.565-5.946.358-1.846.173-3.388-.777-4.47a3.707,3.707,0,0,0-1.063-.82" transform="translate(-23.625 77.793)" fill="#009cde"/>
                    <path id="Path_69" data-name="Path 69" d="M44-73.73q-.225-.067-.464-.119c-.159-.035-.324-.066-.493-.093a12.057,12.057,0,0,0-1.929-.141H35.269a.932.932,0,0,0-.922.789L33.1-65.415l-.036.229a1.064,1.064,0,0,1,1.05-.9h2.189c4.3,0,7.664-1.746,8.647-6.8.029-.149.054-.294.076-.437a5.31,5.31,0,0,0-.809-.341c-.072-.024-.146-.046-.221-.069" transform="translate(-26.702 79.418)" fill="#012169"/>
                  </g>
                </svg>
              </a>
            </div>

          {!this.state.paypal ? (
          <>
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
                    <button className="btn btnMainLarge submit" onClick={this.purchase.bind(this, "cc")}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </BraintreeHostedFields><br></br>
          </>) : (
            <>
            <div className="container">
              <div className={signup.stepWrapper+" "+signup.stepThreeWrapper}>
                <div className="fixed-container">
                  <div className={signup.signUpInner}>
                    <div className={signup.signupBodyWrapper}>
                      <div className="boxWithShadow">
                        <DropIn
                          options={{ authorization: this.state.clientToken,
                          paypal: { flow: "vault" },
                          preselectVaultedPaymentMethod: false,
                          paymentOptionPriority: [
                            "paypal",
                          ],
                        }}
                        onInstance={(instance) => (this.instance = instance)}
                        
                      />
                      <div className={signup.btnWrapper}>
                        <button className="btn btnMainLarge submit" onClick={this.purchase.bind(this, "paypal")}>Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
          )
        }
        </div>
      );
    }
  }
}

export default withRouter(Braintree);
