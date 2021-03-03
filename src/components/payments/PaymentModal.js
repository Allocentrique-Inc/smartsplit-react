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

const fPrice = (n) => (`$${(n / 100).toFixed(2)}`);

const PaymentModal = (props) => {
  const { setShowModal, productId, workpiece, language } = props;
  const user_id = localStorage.getItem('user_id');
  const [user, setUser] = useState();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [promoCode, setPromoCode] = useState(false);
  const [promo, setPromo] = useState();
  const [StepComponent, setStepComponent] = useState();
  const [address, setAddress] = useState();
  const [purchase, setPurchase] = useState();
  const [clientSecret, setClientSecret] = useState();
  const [stepValid, setStepValid] = useState(true);
  const steps = [
    { label: 'Promo Code', component: PromoCodeStep },
    { label: 'Billing Address', component: BillingAddressStep },
    { label: 'Confirm' },
    { label: 'Payment' },
  ];

  const load = async () => {
    const user = await getUsers({ user_id });
    setUser(user);
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
    const product = await getProducts({ product_id: productId });
    setProduct(product);
    setLoading(false);
    console.log(user);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  useEffect(() => {
    load();
  }, [user_id]);

  const stepProps = {
    language,
    user,
    setUser,
    product,
    workpiece,
    promo,
    setPromo,
    address,
    setAddress,
    purchase,
    setPurchase,
    clientSecret,
    setClientSecret,
    loading,
    setLoading,
    fPrice,
    setShowModal,
    nextStep,
    stepValid,
    setStepValid,
  };

  return (
    <div className="paymentModal">
      <div className="modalBackground" onClick={() => setShowModal(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          {currentStep > 0 ? (
            <>
              <div className="topBar">
                <div className="topBarContent">
                  <h4>{loading ? 'loading...' : `${language === 'en' ? 'Buy a' : 'Achetez une'} ${product.name[language]}`}</h4>
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
                {React.createElement(steps[currentStep - 1].component, stepProps)}
              </div>
              <div className="downBar">
                <button
                  className={stepValid ? 'btn-secondary' : 'btn-disabled'}
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
                <button
                  onClick={nextStep}
                  className={stepValid ? 'btn-primary' : 'btn-disabled'}
                  disabled={!stepValid}
                  style={{ marginLeft: '10px' }}
                >
                  Continuer
                </button>
              </div>
            </>
          ) : (<SplashStep {...stepProps} />)
          }

        </div>
      </div>
    </div>
  );
};
export default PaymentModal;
