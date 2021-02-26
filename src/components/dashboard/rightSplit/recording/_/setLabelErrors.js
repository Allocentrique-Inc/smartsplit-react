export default (label) => {
  label.errors = [];
  if (!label.agreementDuration) {
    label.errors.push('shouldSpecifyAgreementDuration');
  }
  return label;
};
