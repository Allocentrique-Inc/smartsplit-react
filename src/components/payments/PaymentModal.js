import React, { useEffect, useState } from 'react';
import X from '../../icons/x';
import getUsers from '../../api/users/getUsers';
import getProducts from '../../api/payments/getProducts';
import PaymentSteps from './PaymentSteps';
import ProductImage from '../../assets/entente.png';
import getPromoCode from '../../api/payments/getPromoCode';
import PromoCodeStep from './steps/PromoCodeStep';
import SplashStep from './steps/SplashStep';
import BillingAddressStep from './steps/BillingAddressStep';
import TransactionStep from './steps/TransactionStep';
import { credits2Munee } from './constants/creditsConversionRate';

const fPrice = (n) => (`$${(n / 100).toFixed(2)}`);

const PaymentModal = (props) => {
  const { setShowModal, productId, workpiece, language } = props;
  const [user, setUser] = useState(props.user);
  const [product, setProduct] = useState(props.product);
  const [currentStep, setCurrentStep] = useState(0);
  const [promoCode, setPromoCode] = useState(false);
  const [promo, setPromo] = useState();
  const [StepComponent, setStepComponent] = useState();
  const [address, setAddress] = useState();
  const [purchase, setPurchase] = useState();
  const [clientSecret, setClientSecret] = useState();
  const [stepValid, setStepValid] = useState(true);
  const [credits, setCredits] = useState(10);
  const [useCredits, setUseCredits] = useState(true);
  const [handlePayment, setHandlePayment] = useState(null);
  useEffect(() => {
    setAddress({
      address_id: '',
      street1: '',
      street2: '',
      city: '',
      province: '',
      postalCode: '',
      country: 'CA',
      ...user.paymentInfo.billingAddress,
    });
    if (workpiece.credits?.remaining) {
      setCredits(workpiece.credits?.remaining);
    }
  }, [user]);
  const steps = [
    { label: 'Promo Code', component: PromoCodeStep, next: 'Continue' },
    { label: 'Billing Address', component: BillingAddressStep, next: 'Confirm Billing Address' },
    { label: 'Payment', component: TransactionStep, next: 'Confirm Amount' },
  ];

  const nextStep = () => {
    if (currentStep === 4) {
      handlePayment();
      return;
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const total = () =>
    fPrice(
      product.price
          - (promo ? promo.value : 0)
          - (useCredits ? credits2Munee(credits) : 0),
    );

  const stepProps = {
    language,
    user,
    setUser,
    product,
    workpiece,
    promo,
    setPromo,
    promoCode,
    setPromoCode,
    address,
    setAddress,
    purchase,
    setPurchase,
    clientSecret,
    setClientSecret,
    fPrice,
    setShowModal,
    nextStep,
    stepValid,
    setStepValid,
    credits,
    useCredits,
    setUseCredits,
    total,
    setHandlePayment,
  };

  return (
    <div className="paymentModal">
      <div className="modalBackground">
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          {currentStep > 0 ? (
            <>
              <div className="topBar">
                <div className="topBarContent">
                  <h4>{`${language === 'en' ? 'Buy a' : 'Achetez une'} ${
                    product.name[language]
                  }`}
                  </h4>
                  <PaymentSteps steps={steps} current={currentStep} />
                </div>
                <button
                  className="btn-icon"
                  onClick={() => setShowModal(false)}
                >
                  <X />
                </button>
              </div>
              <div className="content">
                {React.createElement(
                  steps[currentStep - 1].component,
                  stepProps,
                )}
              </div>
              <div className="downBar">
                <button
                  className={stepValid ? 'btn-secondary' : 'btn-disabled'}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                {currentStep < 3 && (
                <button
                  onClick={nextStep}
                  className={stepValid ? 'btn-primary' : 'btn-disabled'}
                  disabled={!stepValid}
                  style={{ marginLeft: '10px' }}
                >
                  {steps[currentStep - 1].next}
                </button>
                )
                }
              </div>
            </>
          ) : (
            <SplashStep {...stepProps} />
          )}
        </div>
      </div>
    </div>
  );
};
export default PaymentModal;
