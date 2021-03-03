import { useState } from 'react';
import countries from '../constants/countries';
import provinces from '../constants/provinces';
import Pen from '../../../icons/pen';

const BillingAddressStep = (props) => {
  const { user, address, setAddress } = props;
  // have they previously set their Billing Address
  const hasBillingAddress = !!user?.paymentInfo?.billingAddress?.address_id;
  // initially do not show the edit form if they already have a billing Address set

  const [showForm, setShowForm] = useState(!hasBillingAddress);
  setAddress(user?.paymentInfo?.billingAddress?.address_id ? user.paymentInfo.billingAddress : {
    address_id: '',
    street1: '',
    street2: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
  });
  return (
    <>
      {
        showForm ? (
          <div className="addressForm">
            <label>Street :</label><input
              type="text"
              onChange={(e) => {
                setAddress({ ...address, street1: e.target.value });
              }}
            />
          </div>
        ) : (
          <div className="addressBox">
            {address.street1}<br />
            {address.street2 ? <>{address.street2}<br /></> : null}
            {address.city}, {address.province}, {address.postalCode}<br />
            {countries[address.country]}
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button className="btn-icon" onClick={() => setShowForm(true)}><Pen /></button>
          </div>
        )}
    </>

  );
};
export default BillingAddressStep;
