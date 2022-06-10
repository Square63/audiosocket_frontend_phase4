import React from "react";
import DropIn from "braintree-web-drop-in-react";
 
export default class Paypal extends React.Component {
  instance;  
 
  state = {
    clientToken: null,
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
    const data = await response.json();
    const clientToken = data.token
    
    this.setState({
      clientToken: clientToken
    });
  }

  async buy() {
    // Send the nonce to your server
    const { nonce } = await this.instance.requestPaymentMethod();
    debugger
    await fetch(`server.test/purchase/${nonce}`);
  }
 
  render() {
    if (!this.state.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div>
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
          <button onClick={this.buy.bind(this)}>Buy</button>
        </div>
      );
    }
  }
}