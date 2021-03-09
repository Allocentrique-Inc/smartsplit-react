import { useState, useEffect } from 'react';

import ProductCodes from '../../payments/ProductCodes';

import getUsers from '../../../api/users/getUsers';
import PaymentModal from '../../payments/PaymentModal';
import getProductByCode from '../../../api/payments/getProductByCode';

const BuyTest = (props) => {
  const productCode = 'RIGHT_SPLIT_DOWNLOAD';
  const { language, workpiece, workpiece_id } = props;
  const user_id = localStorage.getItem('user_id');
  const [user, setUser] = useState();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const load = async () => {
    const user = await getUsers({ user_id });
    setUser(user);
    const product = await getProductByCode(productCode);
    setProduct(product);
    setLoading(false);
    console.log(user);
  };
  useEffect(() => {
    load();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const modalProps = {
    user,
    product,
    workpiece,
    setShowModal,

    language,
  };
  return (
    <div className="rightSplitCreation">
      <div style={{ margin: '100px 20% 0 20%' }}>
        <h2 className="title">Test Buy</h2>
        {loading ?
          '...loading'
          : <button className="btn-primary" onClick={() => setShowModal(true)}>Buy PDF</button>
        }

        {showModal && <PaymentModal {...modalProps} />}
      </div>
    </div>
  );
};
export default BuyTest;
