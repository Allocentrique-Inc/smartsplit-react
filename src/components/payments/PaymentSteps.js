const PaymentSteps = (props) => {
  const { steps, current } = props;
  return (
    <div className="paymentSteps">
      {steps.map((step, index) => (
        <>
          <div className="step" key={`step_${index + 1}`}>
            <div className={`stepCircle${current - 1 >= index ? ' active' : ''}`}>{index}</div>
            <div className={`stepLabel${current - 1 >= index ? ' active' : ''}`}>{step.label}</div>
          </div>
          <div className={index + 1 === steps.length ? '' : `interStep${index > step ? ' active' : ''}`} />
        </>
      ))}
    </div>
  );
};
export default PaymentSteps;
