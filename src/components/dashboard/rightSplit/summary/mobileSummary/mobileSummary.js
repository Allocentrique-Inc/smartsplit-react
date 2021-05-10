import { useParams, useHistory } from 'react-router-dom';
import MobileTopBar from '../../../_/mobileTopBar/mobileTopBar';
import Tabs, { Tab } from '../../../_/tabs/tabs';
import DraftRightSplit from '../draftRightSplit/draftRightSplit';
import InVoteRightSplit from '../inVoteRightSplit/inVoteRightSplit';
import AcceptedRightSplit from '../acceptedRightSplit/acceptedRightSplit';
import RejectedRightSplit from '../rejectedRightSplit/rejectedRightSplit';
import RejectedRightSplitArchived from '../rejectedRightSplitArchived/rejectedRightSplitArchived';

export default function MobileSummary(props) {
  const {
    t_splitSummary,
    t_waitingSubmit,
    t_waitingDecision,
    t_createANewOne,
    t_withCollaborators,
    t_withEditor,
    t_updated,
    workpiece,
    hasToVote,
    isWithEditorDisabled,
    needResponseToHaveEditor,
  } = props;
  console.log({ isWithEditorDisabled, needResponseToHaveEditor });
  const history = useHistory();
  const { workpiece_id } = useParams();
  const back = () => history.push(`/workpiece/${workpiece_id}`);
  const tabOptions = [
    t_withCollaborators,
    <>
      {t_withEditor}
      {!isWithEditorDisabled && needResponseToHaveEditor && (
        <div className="notification" />
      )}
    </>,
  ];
  const handleClick = () => {
    if (!hasToVote) {
      history.push(`/workpiece/${workpiece_id}/right-split/consult`);
    } else {
      history.push(`/workpiece/${workpiece_id}/right-split/vote`);
    }
  };
  const handleCreateNewVersion = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/copyright`);

  const commonProps = {
    ...props,
    handleClick,
  };
  return (
    <div className="mobileSummary">
      <MobileTopBar back={back} noShadow>
        {t_splitSummary}
      </MobileTopBar>
      <Tabs options={tabOptions}>
        <Tab key={tabOptions[0]}>
          {workpiece.rightSplit._state === 'draft' && (
            <DraftRightSplit {...commonProps} />
          )}
          {workpiece.rightSplit._state === 'voting' && (
            <InVoteRightSplit {...commonProps} />
          )}
          {workpiece.rightSplit._state === 'accepted' && (
            <AcceptedRightSplit {...commonProps} />
          )}
          {workpiece.rightSplit._state === 'rejected' && (
            <>
              <button
                className="btn-secondary"
                onClick={handleCreateNewVersion}
              >
                {t_createANewOne}
              </button>
              <RejectedRightSplit {...commonProps} />
            </>
          )}
          {workpiece.archivedSplits &&
            workpiece.archivedSplits.map((archivedRightSplit, id) => {
              return (
                <RejectedRightSplitArchived
                  id={id}
                  {...commonProps}
                  archivedRightSplit={archivedRightSplit}
                  key={archivedRightSplit.version}
                  // workpiece={workpiece}
                />
              );
            })}
        </Tab>
        <Tab key={tabOptions[1]}>TODO</Tab>
      </Tabs>
    </div>
  );
}
