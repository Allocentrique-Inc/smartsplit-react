import ProductImage from '../../../../../assets/entente.png';
import X from '../../../../../icons/x';

const SuccessStep = (props) => {
  const { product, setShowModal, purchase, setDoCleanup } = props;
  return (

    <div className="successStep">
      <h2>Your purchase was successful!</h2>
      <p style={{ marginTop: '2em' }}> an email has been sent to your primary email address with the invoice and transaction </p>
      <p className="text-right"><button className="btn-primary">Download your product</button></p>
    </div>
  );
};
export default SuccessStep;
