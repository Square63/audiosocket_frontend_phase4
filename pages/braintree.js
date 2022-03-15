import React from "react";
import DropIn from "braintree-web-drop-in-react";
import { BraintreeHostedFields } from 'braintree-web-react'

class Braintree extends React.Component {
  instance;

  state = {
    clientToken: null
  };

  async componentDidMount() {
    // Get a client token for authorization from your server
    const response = await fetch("server.test/client_token");
    const clientToken = "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUyTkRBM056Z3pOemNzSW1wMGFTSTZJakF3TVdZMVl6RTJMV0ppTUdRdE5ETTRPQzA1WTJJMUxXSXlORE16TXpjMlpUYzBNeUlzSW5OMVlpSTZJblJuTkhaamVIbHRNMkp3TnpscmVXZ2lMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pZEdjMGRtTjRlVzB6WW5BM09XdDVhQ0lzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPbVpoYkhObGZTd2ljbWxuYUhSeklqcGJJbTFoYm1GblpWOTJZWFZzZENKZExDSnpZMjl3WlNJNld5SkNjbUZwYm5SeVpXVTZWbUYxYkhRaVhTd2liM0IwYVc5dWN5STZlMzE5LjhXRWU4aVFZSUttMThRRm9SQTRtUWxTbjRSUkMwMnhhekxTOFZ5eUxHRXdPYmZwTlpJVUVZNDFpRXZOUDBhWDNhZXNHSnN6WUlOTFRjX25VLV9KWERnIiwiY29uZmlnVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3RnNHZjeHltM2JwNzlreWgvY2xpZW50X2FwaS92MS9jb25maWd1cmF0aW9uIiwiZ3JhcGhRTCI6eyJ1cmwiOiJodHRwczovL3BheW1lbnRzLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vZ3JhcGhxbCIsImRhdGUiOiIyMDE4LTA1LTA4IiwiZmVhdHVyZXMiOlsidG9rZW5pemVfY3JlZGl0X2NhcmRzIl19LCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvdGc0dmN4eW0zYnA3OWt5aC9jbGllbnRfYXBpIiwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwibWVyY2hhbnRJZCI6InRnNHZjeHltM2JwNzlreWgiLCJhc3NldHNVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImF1dGhVcmwiOiJodHRwczovL2F1dGgudmVubW8uc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbSIsInZlbm1vIjoib2ZmIiwiY2hhbGxlbmdlcyI6W10sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsImFuYWx5dGljcyI6eyJ1cmwiOiJodHRwczovL29yaWdpbi1hbmFseXRpY3Mtc2FuZC5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL3RnNHZjeHltM2JwNzlreWgifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJhbGxvd0h0dHAiOnRydWUsImRpc3BsYXlOYW1lIjoic3F1YXJlNjMiLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwibWVyY2hhbnRBY2NvdW50SWQiOiJzcXVhcmU2MyIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9fQ=="

    this.setState({
      clientToken
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
      debugger
      const response = await axios.post(
        'http://localhost:8000/api/braintree/v1/sandbox',
        { paymentMethodNonce: nonce }
      )

      console.log(response)
    } catch (err) {
      console.error(err)
    }
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
        <div className="container">
          <BraintreeHostedFields
            className="drop-in-container"
            options={{
              authorization: this.state.clientToken
            }}
            onInstance={(instance) => (this.instance = instance)}
          >
            <form id="cardForm">
              <label className="hosted-fields--label">Card Number</label>
              <div id="card-number" className="hosted-field"></div>

              <label className="hosted-fields--label">Expiration Date</label>
              <div id="expiration-date" className="hosted-field"></div>

              <label className="hosted-fields--label">CVV</label>
              <div id="cvv" className="hosted-field"></div>

              <label className="hosted-fields--label">Cuopon Code</label>
              <div id="postal-code" className="hosted-field"></div>
            </form>
          </BraintreeHostedFields>
          <button className="submit" onClick={this.purchase.bind(this)}>Submit</button>
        </div>
      );
    }
  }
}

export default Braintree;