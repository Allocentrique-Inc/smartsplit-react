import { useParams } from 'react-router-dom';
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
    t_createdBy,
    t_consult,
    t_accepted,
    t_rejected,
    t_download,
    t_createANewOne,
    t_withCollaborators,
    t_withEditor,
    t_updated,
    workpiece,
  } = props;
  const { workpiece_id } = useParams();
  const backLink = `/workpiece/${workpiece_id}`;
  const tabNames = [t_withCollaborators, t_withEditor];
  return (
    <div className="mobileSummary">
      <MobileTopBar backLink={backLink} noShadow>
        {t_splitSummary}
      </MobileTopBar>
      <Tabs options={tabNames}>
        <Tab key={tabNames[0]}>
          {workpiece.rightSplit._state === 'draft' && (
            <DraftRightSplit {...props} />
          )}
          {workpiece.rightSplit._state === 'voting' && (
            <InVoteRightSplit {...props} />
          )}
          {workpiece.rightSplit._state === 'accepted' && (
            <AcceptedRightSplit {...props} />
          )}
          {workpiece.rightSplit._state === 'refused' && (
            <RejectedRightSplit {...props} />
          )}
          {workpiece.archivedSplits &&
            workpiece.archivedSplits.map((archivedRightSplit, id) => {
              return (
                <RejectedRightSplitArchived
                  id={id}
                  {...props}
                  archivedRightSplit={archivedRightSplit}
                  key={archivedRightSplit.version}
                  // workpiece={workpiece}
                />
              );
            })}
        </Tab>
        <Tab key={tabNames[1]}>TODO</Tab>
      </Tabs>
    </div>
  );
}
