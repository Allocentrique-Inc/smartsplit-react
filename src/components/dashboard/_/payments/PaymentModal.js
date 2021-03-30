import React, { useEffect, useState } from 'react';
import X from '../../../../icons/x';
import PaymentSteps from './PaymentSteps';
import PromoCodeStep from './steps/PromoCodeStep';
import SplashStep from './steps/SplashStep';
import BillingAddressStep from './steps/BillingAddressStep';
import TransactionStep from './steps/TransactionStep';
import { credits2Munee } from './constants/creditsConversionRate';
import SuccessStep from './steps/SuccessStep';
import deletePurchase from '../../../../api/payments/deletePurchase';
import getProductByCode from '../../../../api/payments/getProductByCode';

const fPrice = (n) => `$${(n / 100).toFixed(2)}`;

const PaymentModal = (props) => {
  const {
    setShowModal,
    workpiece,
    language,
    user,
    setUser,
    productCode,
  } = props;
  const [product, setProduct] = useState(props.product);
  const [currentStep, setCurrentStep] = useState(0);
  const [promoCode, setPromoCode] = useState(false);
  const [promo, setPromo] = useState();
  const [address, setAddress] = useState();
  const [purchase, setPurchase] = useState();
  const [clientSecret, setClientSecret] = useState();
  const [stepValid, setStepValid] = useState(true);
  const [credits, setCredits] = useState(10);
  const [useCredits, setUseCredits] = useState(true);
  const [handlePayment, setHandlePayment] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [doCleanupOnClose, setDoCleanupOnClose] = useState(false);
  const [loading, setLoading] = useState(true);
  const load = async () => {
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
    const product = await getProductByCode(productCode);
    setProduct(product);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, [user]);
  const steps = [
    { label: 'Promo Code', component: PromoCodeStep, next: 'Continue' },
    {
      label: 'Billing Address',
      component: BillingAddressStep,
      next: 'Confirm Billing Address',
    },
    { label: 'Payment', component: TransactionStep, next: 'Confirm Amount' },
    { label: 'Download', component: SuccessStep },
  ];
  const closeModal = async () => {
    if (processing) return;
    if (doCleanupOnClose) {
      await deletePurchase(purchase);
    }
    setShowModal(false);
  };
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
      product.price -
        (promo ? promo.value : 0) -
        (useCredits ? credits2Munee(credits) : 0),
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
    succeeded,
    setSucceeded,
    processing,
    setProcessing,
    doCleanupOnClose,
    setDoCleanupOnClose,
    productCode,
  };

  return (
    <div className="paymentModal">
      <div className="modalBackground">
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          {loading ? (
            <div className="loadingStep">Loading...</div>
          ) : currentStep > 0 ? (
            <>
              <div className="topBar">
                <div className="topBarContent">
                  <h4>
                    {`${language === 'en' ? 'Buy a' : 'Achetez une'} ${
                      product.name[language]
                    }`}
                  </h4>
                  <PaymentSteps steps={steps} current={currentStep} />
                </div>
                <button
                  className="btn-icon"
                  disabled={processing}
                  onClick={() => closeModal()}
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
                  disabled={processing || !stepValid}
                  onClick={() => closeModal()}
                >
                  {currentStep === 4 ? 'Close' : 'Cancel'}
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
                )}
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
