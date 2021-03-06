import ProductImage from '../../../assets/entente.png';
import X from '../../../icons/x';

const SuccessStep = (props) => {
  const { product, setShowModal, purchase, setDoCleanup } = props;
  return (
    <div className="splashModal">
      <div className="splashContent">
        <div className="splashImage">
          <img alt="" src={ProductImage} />
        </div>

        <h5> Your purchase of {product.title} was successful.</h5>
        <h2>Success!</h2>
        <h3> an email has been sent to your primary email address with the invoice and transaction </h3>
        <button className="btn-primary">Download your product</button>
        <button
          className="btn-icon"
          onClick={() => setShowModal(false)}
        >
          <X />
        </button>
      </div>
    </div>
  );
};
export default SuccessStep;
