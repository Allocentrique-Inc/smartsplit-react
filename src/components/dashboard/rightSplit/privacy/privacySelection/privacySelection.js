import Option from "./option/option";

const DividingMethod = (props) => (
  <div style={style.b1}>
    {[
      { value: "private", label: "Privee" },
      { value: "public", label: "Public" },
    ].map((el) => (
      <Option key={el.value} {...el} {...props} />
    ))}
  </div>
);

export default DividingMethod;

const style = {
  b1: {
    marginBottom: "32px",
  },
};
