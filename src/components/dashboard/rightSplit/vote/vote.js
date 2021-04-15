import { useState, useEffect } from 'react';
import Title from './title/title';
import Creation from './creation/creation';
import SplitOwner from './splitOwner/splitOwner';
import Consult from '../consult/consult';
import DownBar from './downBar/downBar';

const Vote = (props) => {
  const [votes, setVotes] = useState({
    copyright: {
      vote: '',
      comment: '',
    },
    performance: {
      vote: '',
      comment: '',
    },
    recording: {
      vote: '',
      comment: '',
    },
    label: {
      vote: '',
      comment: '',
    },
    privacy: {
      vote: '',
      comment: '',
    },
  });
  const setVote = (vote, value) => {
    setVotes((prevState) => ({ ...prevState, [vote]: { ...value } }));
  };
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
  const voteTotal = Object.values(votes).filter((el) => el.vote !== '').length;
  const { title, owner } = props.workpiece;
  const ownerName = `${owner.firstName} ${owner.lastName}`;
  const splitOwner = props.workpiece.rightSplit.owner;
  const splitOwnerName = `${splitOwner.firstName} ${splitOwner.lastName}`;
  const { version } = props.workpiece.rightSplit;

  const translation = props.translations.rightSplit.vote;
  const t_title = translation._title[props.language];
  const t_createdBy = translation._createdBy[props.language];
  const t_voteCount = translation._voteCount[props.language];
  const t_submitVote = { fr: 'Soumettre mon vote', en: 'Submit my vote' }[
    props.language
  ];

  const commonProps = {
    ...props,
    votes,
    setVote,
    voteNbrNeeded,
    voteTotal,
    t_voteCount,
    t_submitVote,
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
            <Consult {...commonProps} voting />
          </div>
        </div>
      </div>
      <DownBar {...commonProps} />
    </div>
  );
};

export default Vote;
