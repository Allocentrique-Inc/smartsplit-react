import { useState } from 'react';
import countries from '../constants/countries';
import provinces from '../constants/provinces';
import Pen from '../../../../../icons/pen';
import createAddress from '../../../../../api/payments/createAddress';
import getUsers from '../../../../../api/users/getUsers';

const BillingAddressStep = (props) => {
  const { user, setUser, address, setAddress, stepValid, setStepValid } = props;
  console.log(address);
  // have they previously set their Billing Address
  let hasBillingAddress = false;
  if (user) hasBillingAddress = !!user.paymentInfo.billingAddress.address_id;
  // initially do not show the edit form if they already have a billing Address set
  if (!hasBillingAddress) setStepValid(false);

  const [showForm, setShowForm] = useState(!hasBillingAddress);
  const [busy, setBusy] = useState(false);
  const saveAddress = async () => {
    if (hasBillingAddress) {
      let changed = false;
      Object.keys(address).forEach((k) => {
        if (k === 'active' || k === 'address_id' || k === 'user_id') return;
        if (!address[k] && !user.paymentInfo.billingAddress[k]) return;
        if (address[k] !== user.paymentInfo.billingAddress[k]) { changed = true; }
      });
      if (!changed) {
        console.log('no change');
        setShowForm(false);
        setStepValid(true);
      } else {
        const newAddress = await createAddress(user, address);
        const userUpdated = await getUsers({ user_id: user.user_id });
        setUser(userUpdated);
        setShowForm(false);
        setStepValid(true);
      }
    }
  };
  return (
    <>
      {
        showForm ? (
          <div className="addressForm">
            <h3>Enter Your Billing Address</h3>
            <p />
            <p><label>Street :</label><input
              type="text"
              onChange={(e) => {
                setAddress({ ...address, street1: e.target.value });
              }}
              value={address.street1}
            />
            </p>
            <p><label>Street2 :</label><input
              type="text"
              onChange={(e) => {
                setAddress({ ...address, street2: e.target.value });
              }}
              value={address.street2}
            />
            </p>
            <p>
              <label>City :</label>
              <input
                type="text"
                onChange={(e) => {
                  setAddress({ ...address, city: e.target.value });
                }}
                value={address.city}
              />
            </p>
            <p>
              <label>Province/State :</label>
              {address.country === 'CA' || address.country === 'US' ? (
                <select
                  type="text"
                  onChange={(e) => {
                    setAddress({ ...address, province: e.target.selectedOptions[0].value });
                  }}
                >
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <option value="">select {address.country === 'US' ? 'state' : 'province'}</option>
                  {Object.keys(provinces[address.country]).map(
                    (p) => <option value={p} selected={p === address.province}>{provinces[address.country][p]}</option>,
                  )}

                </select>
              ) : (
                <input
                  type="text"
                  onChange={
                    (e) => { setAddress({ ...address, province: e.target.value }); }
                  }
                  value={address.province}
                />
              )}
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

            </p>
            <p>
              <label>Postal/Zip Code :</label>
              <input
                type="text"
                onChange={(e) => {
                  setAddress({ ...address, postalCode: e.target.value });
                }}
                value={address.postalCode}
              />
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

            </p>
            <p>
              <label>Country :</label>
              <select
                type="text"
                onChange={(e) => {
                  setAddress({ ...address, country: e.target.selectedOptions[0].value });
                }}
              >
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <option value="">select country</option>
                {Object.keys(countries).map(
                  (c) => <option value={c} selected={address.country === c}>{countries[c]}</option>,
                )}

              </select>
            </p>
            <p>
              <label />
              <button className={busy ? 'btn-disabled' : 'btn-primary'} onClick={saveAddress} disabled={busy}>Save Address</button>
              <button className={busy ? 'btn-disabled' : 'btn-secondary'} style={{ marginLeft: '10px' }} didsabled={busy}>Cancel</button>
            </p>
          </div>
        ) : (
          <>
            <h3>Current Address</h3>
            <div className="addressBox">
              {address.street1}<br />
              {address.street2 ? <>{address.street2}<br /></> : null}
              {address.city}, {address.province}, {address.postalCode}<br />
              {countries[address.country]}
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                className="btn-icon"
                onClick={() => {
                  setStepValid(false);
                  setShowForm(true);
                }}
              ><Pen />
              </button>
            </div>
          </>
        )}
    </>

  );
};
export default BillingAddressStep;
