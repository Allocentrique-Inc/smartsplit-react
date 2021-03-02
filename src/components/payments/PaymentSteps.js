const PaymentSteps = (props) => {
  const { steps, current } = props;
  return (
    <div className="paymentSteps">
      {steps.map((step, index) => (
        <>
          <div className="step">
            <div className={`stepCircle${current >= index ? ' active' : ''}`}>{index + 1}</div>
            <div className={`stepLabel${current >= index ? ' active' : ''}`}>{step.label}</div>
          </div>
          <div className={index + 1 === steps.length ? '' : `interStep${index > step ? ' active' : ''}`} />
        </>
      ))}
    </div>
  );
};
export default PaymentSteps;
