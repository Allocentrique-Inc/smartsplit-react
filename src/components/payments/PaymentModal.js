import { useEffect, useState } from 'react';
import X from '../../icons/x';
import getUsers from '../../api/users/getUsers';
import getProducts from '../../api/payments/getProducts';
import PaymentSteps from './PaymentSteps';

const PaymentModal = (props) => {
  const { setShowModal, productId, workpiece, language } = props;
  const user_id = localStorage.getItem('user_id');
  const [user, setUser] = useState();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { label: 'Promo Code' },
    { label: 'Billing Address' },
    { label: 'Confirm' },
    { label: 'Payment' },
  ];
  const load = async () => {
    const user = await getUsers({ user_id });
    setUser(user);
    const product = await getProducts({ product_id: productId });
    setProduct(product);
    setLoading(false);
    console.log(user);
  };
  useEffect(() => {
    load();
  }, [user_id]);
  return (
    <div className="paymentModal">
      <div className="modalBackground" onClick={() => setShowModal(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="topBar">
            <div className="topBarContent"><h4>{loading ? 'loading...' : `${language === 'en' ? 'Buy a' : 'Achetez une'} ${product.name[language]}`}</h4>
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
            {loading ? 'LOADING' : product.description[language]}
          </div>
          <div className="downBar">
            <button
              className="btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Annuler
            </button>
            <button onClick={() => {}} className="btn-primary">
              Continuer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentModal;
