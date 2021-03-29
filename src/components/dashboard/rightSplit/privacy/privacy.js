import { useParams } from 'react-router-dom';
import { useState } from 'react';
import TopBar from '../_/topBar/topBar';
import DownBar from '../_/downBar/downBar';
import Presentation from '../_/presentation/presentation';
import PrivacySelection from './privacySelection/privacySelection';
import Success from './success/success';
import PostSaveConsult from './postSaveConsult/postSaveConsult';
import PageErrors from '../_/pageErrors/pageErrors';

const Privacy = (props) => {
  const { workpiece_id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [isConsulting, setIsConsulting] = useState(false);
  const [isAdjustingEmails, setIsAdjustingEmails] = useState(false);
  const [triedSubmit, setTriedSubmit] = useState(false);

  const flowErrors = props.calculateFlowErrors(
    props.copyright,
    props.performance,
    props.recording,
    props.label,
  );

  const handleSave = async () => {
    setTriedSubmit(true);
    if (flowErrors.length === 0) {
      await props.saveRightSplit();
      setIsSaved(true);
    }
  };

  const t_title = props.translations.rightSplit.title._privacy[props.language];
  const t_presentation =
    props.translations.rightSplit.presentation._privacy[props.language];
  const t_description =
    props.translations.rightSplit.description._privacy[props.language];

  const commonProps = {
    ...props,
    isSaved,
    setIsSaved,
    isConsulting,
    setIsConsulting,
    isAdjustingEmails,
    setIsAdjustingEmails,
    t_title,
    t_presentation,
    t_description,
    triedSubmit,
    setTriedSubmit,
  };

  return (
    <div className="rightSplitCreation">
      {isSaved && (
        <div className="modalBackground">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {!isConsulting && <Success {...commonProps} />}

            {isConsulting && !isAdjustingEmails && (
              <PostSaveConsult
                {...commonProps}
                rightSplitInConsultation={props.workpiece.rightSplit}
              />
            )}
          </div>
        </div>
      )}
      <TopBar {...commonProps} view="privacy" errors={flowErrors} />
      <div className="b1">
        <div className="b1b1">
          <div className="b1b1b1">
            <Presentation {...commonProps} view="privacy" />
            <PrivacySelection {...commonProps} />
            {triedSubmit && <PageErrors {...commonProps} errors={flowErrors} />}
          </div>
          {!props.isMobile && <div className="b1b1b2" />}
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
