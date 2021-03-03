import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import React, { useState, useEffect } from 'react';
import ProductImage from '../../../assets/entente.png';

const stripe = loadStripe('pk_test_51IK8XlIayL0oggkdXNvYQhloDaPLfjKIrBSJotk7M4Esh2PLx4CqTR17bNBc0IuMoqvUVHlc85qXHQPA8sRYgpPC00y3coZqHM');
const PaymentStep = (props) => {
  const { setStepValid, purchase, fPrice, setHandlePayment } = props;
  return (
    <Elements stripe={stripe}>
      <h3>Enter your payment information</h3>
      <div className="order">
        <div className="item-row">
          <div className="item-image"><img alt="" src={ProductImage} /></div>
          <div className="item-description text-right medium-700">Payment:</div>
          <div className="item-price">{fPrice(purchase.total)}</div>
        </div>
      </div>
      <CheckoutForm {...props} />
    </Elements>
  );
};
export default PaymentStep;

export const CheckoutForm = (props) => {
  const { clientSecret, stepValid, setStepValid, setHandlePayment } = props;
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  //const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  console.log(`client secret is : ${clientSecret}`);
  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleChange = async (event) => {
    console.log(event);
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setStepValid(!event.empty);
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async () => {
    // ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    console.log(payload);
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };
  useEffect(() => {
    //setStepValid(false);
    //setHandlePayment(handleSubmit);
  }, []);

  return (
    <>
      <h3>Enter your payment information:</h3>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      {succeeded && (
        <p className="result-message">
          Payment succeeded, see the result in your
          <a
            href="https://dashboard.stripe.com/test/payments"
          >
            {' '}
            Stripe dashboard.
          </a> Refresh the page to pay again.
        </p>
      )}
      <div className="text-right" style={{ marginTop: '20px' }}>
        <button className={disabled ? 'btn-disabled' : 'btn-primary'} onClick={handleSubmit}>PAY NOW!</button>
      </div>
    </>
  );
};
