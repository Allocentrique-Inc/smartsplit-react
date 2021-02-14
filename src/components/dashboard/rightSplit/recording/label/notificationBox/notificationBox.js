const NotificationBox = (props) => (
  <div className="checkBoxRow" onClick={props.toggle}>
    <input type="checkbox" checked={props.value} onChange={() => {}} />
    <label>{props.tag}</label>
  </div>
);

export default NotificationBox;
