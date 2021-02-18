import CheckMark from '../../../../../../icons/check-mark';

const NotificationBox = (props) => (
  <div className="checkBoxRow">
    <div className="checkBox" onClick={props.toggle}>
      {props.value && (
        <div className="isChecked">
          <CheckMark />
        </div>
      )}
    </div>
    <label>{props.tag}</label>
  </div>
);

export default NotificationBox;
