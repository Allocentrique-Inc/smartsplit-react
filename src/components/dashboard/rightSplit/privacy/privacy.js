import { useParams } from 'react-router-dom';
import { useState } from 'react';
import TopBar from '../_/topBar/topBar';
import DownBar from '../_/downBar/downBar';
import Presentation from '../_/presentation/presentation';
import PrivacySelection from './privacySelection/privacySelection';
import Success from './success/success';
import PostSaveConsult from './postSaveConsult/postSaveConsult';
import AdjustEmails from './adjustEmails/adjustEmails';

const Privacy = (props) => {
  const { workpiece_id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  const [isAdjustingEmails, setIsAdjustingEmails] = useState(false);
  const handleSave = async () => {
    await props.saveRightSplit();
    setIsSaved(true);
  };
  const title = props.translations.rightSplit.title._privacy[props.language];
  const textPresentation =
    props.translations.rightSplit.textPresentation._privacy[props.language];
  const textDescription =
    props.translations.rightSplit.textDescription._privacy[props.language];
  const commonProps = {
    ...props,
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
              <PostSaveConsult {...commonProps} />
            )}
            {isConsulting && isAdjustingEmails && (
              <AdjustEmails {...commonProps} />
            )}
          </div>
        </div>
      )}

      <TopBar {...props} view="privacy" />
      <div className="b1">
        <div className="b1b1">
          <div className="b1b1b1">
            <Presentation {...commonProps} view="privacy" />
            <PrivacySelection {...commonProps} />
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
