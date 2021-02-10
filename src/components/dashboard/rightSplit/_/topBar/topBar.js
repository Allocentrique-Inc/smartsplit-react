import { useParams, useHistory } from 'react-router-dom';

const TopBar = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();

  // Displayed data
  const title = props.workpiece.title || '';
  const breadCrumb1 = props.translations.rightSplit.topBar.breadCrumb._rightSplits[
    props.language
  ];
  const breadCrumb2 = props.translations.rightSplit.topBar.breadCrumb[`_${props.view}`][
    props.language
  ];

  return (
    <div className="topBar">
      <div className="bx">
        <div className="img" />
        <div className="title">{title}</div>
        <div className="breadCrumb">
          <div className="p1">{breadCrumb1}</div>
          <div className="arrow" />
          <div className="p2">{breadCrumb2}</div>
        </div>
      </div>
      <div className="bx">
        <div className="credit" />
        <div
          className="saveAndQuit"
          onClick={async () => {
            await props.saveRightSplit();
            history.push(`/workpiece/${workpiece_id}`);
          }}
        >
          Save And Quit
        </div>
        <div className="profile" />
      </div>
    </div>
  );
};

export default TopBar;
