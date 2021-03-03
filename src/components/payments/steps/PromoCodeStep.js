import ProductImage from '../../../assets/entente.png';
import getPromoCode from '../../../api/payments/getPromoCode';

const PromoCodeStep = (props) => {
  const { language, product, promo, setPromo, promoCode, setPromoCode, fPrice } = props;
  const fetchPromo = async (code) => {
    const promo = await getPromoCode(code);
    if (promo) setPromo(promo);
  };
  return (
    <div className="order">
      <div className="item-row">
        <div className="item-image"><img alt="" src={ProductImage} /></div>
        <div className="item-description">{product.description[language]}</div>
        <div className="item-price">{fPrice(product.price)}</div>
      </div>
      <div className="item-row">
        <div className="item-image">
          <label>{promo ? 'Promo Code:' : 'Enter a Promo Code:'}</label>
        </div>
        <div className="item-description">{
                promo ?
                  `${promo.organisation[language]}: ${promo.description[language]} `
                  : <input type="text" onChange={(e) => { setPromoCode(e.target.value); }} />}
        </div>
        <div className="item-price">{
                promo ?
                  `-${fPrice(promo.value)}`
                  : (
                    <button
                      className={promoCode ? 'btn-primary-small' : 'btn-disabled'}
                      disabled={!promoCode}
                      onClick={(e) => {
                        e.preventDefault();
                        fetchPromo(promoCode).catch((e) => {
                          console.log(e);
                        });
                      }}
                    >fetch
                    </button>
                  ) }
        </div>
      </div>
    </div>
  );
};
export default PromoCodeStep;
