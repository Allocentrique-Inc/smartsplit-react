import { useState, useEffect } from 'react';
import Title from './title/title';
import Creation from './creation/creation';
import SplitOwner from './splitOwner/splitOwner';
import Consult from '../consult/consult';
import DownBar from './downBar/downBar';

const Vote = (props) => {
  const [copyrightVote, setCopyrightVote] = useState({
    vote: '',
    comment: '',
  });
  const [performanceVote, setPerformanceVote] = useState({
    vote: '',
    comment: '',
  });
  const [recordingVote, setRecordingVote] = useState({
    vote: '',
    comment: '',
  });
  const [labelVote, setLabelVote] = useState({
    vote: '',
    comment: '',
  });
  const [privacyVote, setPrivacyVote] = useState({
    vote: '',
    comment: '',
  });

  const rightSplit = props.workpiece.rightSplit;
  const voteNbrNeeded = [
    rightSplit.copyright &&
      rightSplit.copyright.some(
        (el) => el.rightHolder_id === props.user.user_id,
      ),
    rightSplit.performance &&
      rightSplit.performance.some(
        (el) => el.rightHolder_id === props.user.user_id,
      ),
    rightSplit.recording &&
      rightSplit.recording.some(
        (el) => el.rightHolder_id === props.user.user_id,
      ),
    rightSplit.label && rightSplit.label.rightHolder_id === props.user.user_id,
    rightSplit.privacy &&
      rightSplit.privacy.some((el) => el.rightHolder_id === props.user.user_id),
  ].filter((el) => el === true).length;
  const voteTotal = [
    copyrightVote,
    performanceVote,
    recordingVote,
    labelVote,
    privacyVote,
  ].filter((el) => el.vote !== '').length;

  const { title, owner } = props.workpiece;
  const ownerName = `${owner.firstName} ${owner.lastName}`;
  const splitOwner = props.workpiece.rightSplit.owner;
  const splitOwnerName = `${splitOwner.firstName} ${splitOwner.lastName}`;
  const { version } = props.workpiece.rightSplit;

  const translation = props.translations.rightSplit.vote;
  const t_title = translation._title[props.language];
  const t_createdBy = translation._createdBy[props.language];
  const t_voteCount = translation._voteCount[props.language];

  const commonProps = {
    ...props,
    copyrightVote,
    setCopyrightVote,
    performanceVote,
    setPerformanceVote,
    recordingVote,
    setRecordingVote,
    labelVote,
    setLabelVote,
    privacyVote,
    setPrivacyVote,
    voteNbrNeeded,
    voteTotal,
    t_voteCount,
  };
  return (
    <div className="vote">
      <div className="b1">
        <div className="inner">
          <div className="voteTitle">{`${t_title} ${title}`}</div>
          <div className="workpieceDetails">
            {t_createdBy}
            <span className="ownerName">{ownerName}</span>
            {/* - Mis à jour il y a
            ----- */}
          </div>
          <div className="version">{`Version ${version}`}</div>
          <div className="workpieceDetails">
            {t_createdBy}
            <span className="ownerName">{splitOwnerName}</span>
            {/* - il y a ----- */}
          </div>
          <div className="consult">
            <Consult
              {...props}
              {...commonProps}
              voting
              rightSplitInConsultation={props.workpiece.rightSplit}
            />
          </div>
        </div>
      </div>
      <DownBar {...props} {...commonProps} />
    </div>
  );
};

export default Vote;
