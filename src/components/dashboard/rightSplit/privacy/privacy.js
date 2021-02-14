import { useParams, useHistory } from 'react-router-dom';
import { useState } from 'react';
import TopBar from '../_/topBar/topBar';
import DownBar from '../_/downBar/downBar';
import Presentation from '../_/presentation/presentation';
import PrivacySelection from './privacySelection/privacySelection';
import Success from './success/success';
import Consult from '../consult/consult';
import submitRightSplit from '../../../../api/workpieces/submitRightSplit';

const style = {
  b1: {
    display: 'flex',
    justifyContent: 'center',
  },
  b1b1: {
    width: '944px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '100px',
    minHeight: 'calc(100vh - 248px)',
  },
  b1b1b1: {
    width: '464px',
  },
  b1b1b2: {
    width: '464px',
  },
  b1b1b2b1: {
    position: 'sticky',
    top: '144px',
    display: 'flex',
    justifyContent: 'space-around',
  },
};

const Privacy = (props) => {
  const { workpiece_id } = useParams();
  const history = useHistory();
  const [isSaved, setIsSaved] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  const [isAdjustingEmails, setIsAdjustingEmails] = useState(false);
  const handleSave = async () => {
    await props.saveRightSplit();
    setIsSaved(true);
  };

  const title = props.translations.rightSplit.title._privacy[props.language];
  const textPresentation = props.translations.rightSplit.textPresentation._privacy[props.language];
  const textDescription = props.translations.rightSplit.textDescription._privacy[props.language];

  const commonProps = {
    isSaved,
    setIsSaved,
    isConsulting,
    setIsConsulting,
    isAdjustingEmails,
    setIsAdjustingEmails,
    title,
    textPresentation,
    textDescription,
  };
  return (
    <div className="rightSplitCreation">
      {isSaved && (
        <div className="modalBackground">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {!isConsulting && <Success {...commonProps} />}

            {isConsulting && !isAdjustingEmails && (
              <div>
                <Consult {...props} {...commonProps} vote={false} />
                <button
                  onClick={() => {
                    setIsAdjustingEmails((e) => !e);
                  }}
                >
                  Go
                </button>
              </div>
            )}

            {isConsulting && isAdjustingEmails && (
              <div>
                Adjust Emails
                <button
                  onClick={async () => {
                    await submitRightSplit({
                      workpiece_id: props.workpiece.workpiece_id,
                    });
                    props.resetData();
                    history.push(
                      `/workpiece/${workpiece_id}/right-split/kanban`,
                    );
                  }}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <TopBar {...props} view="privacy" />
      <div className="b1">
        <div className="b1b1">
          <div className="b1b1b1">
            <Presentation {...commonProps} />
            <PrivacySelection {...props} />
          </div>
          <div className="b1b1b2" />
        </div>
      </div>
      <DownBar
        backUrl={`/workpiece/${workpiece_id}/right-split/recording`}
        save={handleSave}
      />
    </div>
  );
};

export default Privacy;
