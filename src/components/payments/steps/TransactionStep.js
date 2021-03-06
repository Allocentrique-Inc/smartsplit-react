import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import ProductImage from '../../../assets/entente.png';
import { credits2Munee } from '../constants/creditsConversionRate';
import createPurchase from '../../../api/payments/createPurchase';
import completePurchase from '../../../api/payments/completePurchase';

const stripe = loadStripe('pk_test_51IK8XlIayL0oggkdXNvYQhloDaPLfjKIrBSJotk7M4Esh2PLx4CqTR17bNBc0IuMoqvUVHlc85qXHQPA8sRYgpPC00y3coZqHM');
const TransactionStep = (props) => {
  const {
    user,
    workpiece,
    product,
    fPrice,
    language,
    promo,
    useCredits,
    credits,
    purchase,
    setPurchase,
    address,
    total,
    stepValid,
    setStepValid,
    clientSecret,
    setClientSecret,
    nextStep,
  } = props;
  const [loading, setLoading] = useState(true);
  const initPurchase = async () => {
    let purchase = {
      user_id: user.user_id,
      workpiece_id: workpiece.workpiece_id,
      product: product.product_id,
      billingAddress: address.address_id,

    };
    if (promo) {
      purchase = {
        ...purchase,
        promoCode: promo.promo_id,
      };
    }
    if (credits) {
      purchase = {
        ...purchase,
        creditsUsed: credits,
        creditsValue: credits2Munee(credits),
      };
    }
    const paymentIntent = await createPurchase(purchase);
    setPurchase(paymentIntent.purchase);
    setClientSecret(paymentIntent.clientSecret);
    console.log(paymentIntent.clientSecret);
    setLoading(false);
    setStepValid(true);
  };
  useEffect(() => {
    setStepValid(false);
    initPurchase();
  }, []);
  if (!purchase) {
    return 'LOADING...';
  }
  return (
    <div className="order">
      <div className="item-row">
        <div className="item-image">
          <img alt="" src={ProductImage} />
        </div>
        <div className="item-description">{purchase.product.description[language]}</div>
        <div className="item-price">{fPrice(purchase.product.price)}</div>
      </div>
      {promo && (
        <div className="item-row">
          <div className="item-image text-right">
            <label>Promo Code:</label>
          </div>
          <div className="item-description">
            {purchase.promoCode.organisation[language]}: {purchase.promoCode.description[language]} `
          </div>
          <div className="item-price">-{fPrice(purchase.promoCode.value)}</div>
        </div>
      )}
      {credits && useCredits && (
        <div className="item-row">
          <div className="item-image text-right">
            <label>Credits</label>
          </div>
          <div className="item-description">
            Use {credits} Credits on this purchase
          </div>
          <div className="item-price">-{fPrice(credits2Munee(purchase.creditsValue))}</div>
        </div>
      )}
      {purchase.gst && (
      <div className="item-row">
        <div className="item-image" />
        <div className="item-description text-right medium-700">GST/TPS:</div>
        <div className="item-price">{fPrice(purchase.gst)}</div>
      </div>
      )}
      {purchase.pst && (
        <div className="item-row">
          <div className="item-image" />
          <div className="item-description text-right medium-700">QST/TVQ:</div>
          <div className="item-price">{fPrice(purchase.pst)}</div>
        </div>
      )}
      <div className="item-row">
        <div className="item-image" />
        <div className="item-description text-right medium-700">Total:</div>
        <div className="item-price">{fPrice(purchase.total)}</div>
      </div>
      <div className="hline" />
      <Elements stripe={stripe}>
        <h3>Enter your payment information</h3>
        <CheckoutForm {...props} />
      </Elements>
    </div>

  );
};
export default TransactionStep;
const CheckoutForm = (props) => {
  const { nextStep, purchase } = props;
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
      setStepValid(true);
      setProcessing(false);
      setSucceeded(true);
      const updatedPurchase = await completePurchase({
        user_id: purchase.user_id,
        purchase_id: purchase.purchase_id,
        status: 'succeeded',
      });
      nextStep();
    }
  };
  useEffect(() => {
    //setStepValid(false);
    //setHandlePayment(handleSubmit);
  }, []);

  return (
    <>
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
      {!succeeded && (
      <div className="text-right" style={{ marginTop: '20px' }}>
        <button className={disabled || processing ? 'btn-disabled' : 'btn-primary'} onClick={handleSubmit}>PAY NOW!</button>
      </div>
      )}
    </>
  );
};
