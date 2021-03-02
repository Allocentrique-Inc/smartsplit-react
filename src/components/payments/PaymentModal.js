import { useEffect, useState } from 'react';
import X from '../../icons/x';
import getUsers from '../../api/users/getUsers';
import getProducts from '../../api/payments/getProducts';

const PaymentModal = (props) => {
  const { setShowModal, productId, workpiece, language } = props;
  const user_id = localStorage.getItem('user_id');
  const [user, setUser] = useState();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const load = async () => {
    const user = await getUsers({ user_id });

    setUser(user);
    const product = await getProducts({ product_id: productId });
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
            <div><h4>Acheter un feature</h4>
              <div />
            </div>
            <button
              className="btn-icon"
              onClick={() => setShowModal(false)}
            >
              <X />
            </button>
          </div>
          <div className="content">
            modal content
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
