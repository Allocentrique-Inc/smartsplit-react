import { useEffect, useState } from 'react';
import ProductImage from '../../../assets/entente.png';
import { credits2Munee } from '../constants/creditsConversionRate';
import createPurchase from '../../../api/payments/createPurchase';

const ReviewStep = (props) => {
  const {
    user,
    workpiece,
    product,
    fPrice,
    language,
    promo,
    useCredits,
    credits,
    purchase,
    setPurchase,
    address,
    total,
    stepValid,
    setStepValid,
    clientSecret,
    setClientSecret,
  } = props;
  const [loading, setLoading] = useState(true);
  const initPurchase = async () => {
    let purchase = {
      user_id: user.user_id,
      workpiece_id: workpiece.workpiece_id,
      product: product.product_id,
      billingAddress: address.address_id,

    };
    if (promo) {
      purchase = {
        ...purchase,
        promoCode: promo.promo_id,
      };
    }
    if (credits) {
      purchase = {
        ...purchase,
        creditsUsed: credits,
        creditsValue: credits2Munee(credits),
      };
    }
    const paymentIntent = await createPurchase(purchase);
    setPurchase(paymentIntent.purchase);
    setClientSecret(paymentIntent.clientSecret);
    console.log(paymentIntent.clientSecret);
    setLoading(false);
    setStepValid(true);
  };
  useEffect(() => {
    setStepValid(false);
    initPurchase();
  }, []);
  if (!purchase) {
    return 'LOADING...';
  }
  return (
    <div className="order">
      <div className="item-row">
        <div className="item-image">
          <img alt="" src={ProductImage} />
        </div>
        <div className="item-description">{purchase.product.description[language]}</div>
        <div className="item-price">{fPrice(purchase.product.price)}</div>
      </div>
      {promo && (
        <div className="item-row">
          <div className="item-image text-right">
            <label>Promo Code:</label>
          </div>
          <div className="item-description">
            {purchase.promoCode.organisation[language]}: {purchase.promoCode.description[language]} `
          </div>
          <div className="item-price">-{fPrice(purchase.promoCode.value)}</div>
        </div>
      )}
      {credits && useCredits && (
        <div className="item-row">
          <div className="item-image text-right">
            <label>Credits</label>
          </div>
          <div className="item-description">
            Use {credits} Credits on this purchase
          </div>
          <div className="item-price">-{fPrice(credits2Munee(purchase.creditsValue))}</div>
        </div>
      )}
      {purchase.gst && (
      <div className="item-row">
        <div className="item-image" />
        <div className="item-description text-right medium-700">GST/TPS:</div>
        <div className="item-price">{fPrice(purchase.gst)}</div>
      </div>
      )}
      {purchase.pst && (
        <div className="item-row">
          <div className="item-image" />
          <div className="item-description text-right medium-700">QST/TVQ:</div>
          <div className="item-price">{fPrice(purchase.pst)}</div>
        </div>
      )}
      <div className="item-row">
        <div className="item-image" />
        <div className="item-description text-right medium-700">Total:</div>
        <div className="item-price">{fPrice(purchase.total)}</div>
      </div>
    </div>
  );
};
export default ReviewStep;
