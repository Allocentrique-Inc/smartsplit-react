const PaymentSteps = (props) => {
  const { steps, current } = props;
  return (
    <div className="paymentSteps">
      {steps.map((step, index) => (
        <div className="step">
          <div className={`stepCircle${current >= index ? ' active' : ''}`}>{index}</div>
          <div className="stepText">{step.label}</div>
        </div>
      ))}
    </div>
  );
};
export default PaymentSteps;
