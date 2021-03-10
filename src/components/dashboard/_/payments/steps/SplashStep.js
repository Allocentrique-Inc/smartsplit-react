import ProductImage from '../../../../../assets/entente.png';
import X from '../../../../../icons/x';

const SplashStep = (props) => {
  const { setShowModal, nextStep, loading, product, fPrice } = props;
  return (
    <>
      <div className="splashModal">
        <div className="splashContent">
          <div className="splashImage">
            <img alt="" src={ProductImage} />
          </div>
          <div className="splashProductInfo">
            <h5>Télécharger l'entente</h5>
            <h3>Concrétisez votre entente légalement</h3>
            <p>Partagez une entente et faites la signer par toutes les parties pour sceller votre entente et bla et bla et bla.</p>
          </div>
        </div>
        <button
          className="btn-icon"
          onClick={() => setShowModal(false)}
        >
          <X />
        </button>
      </div>

      <div className="downBar splash">
        <button
          onClick={() => {
            nextStep();
          }}
          className="btn-primary"
        >
          {loading ? 'loading' : `BUY NOW for ${fPrice(product.price)} !` }
        </button>
      </div>
    </>
  );
};
export default SplashStep;
