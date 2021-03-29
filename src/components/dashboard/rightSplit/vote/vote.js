import { useState, useEffect } from 'react';
import Title from './title/title';
import Creation from './creation/creation';
import SplitOwner from './splitOwner/splitOwner';
import Consult from '../consult/consult';
import DownBar from './downBar/downBar';
import ArtistName from '../../_/artistName/artistName';

const Vote = (props) => {
  const [copyright, setCopyright] = useState({
    vote: '',
    comment: '',
  });
  const [performance, setPerformance] = useState({
    vote: '',
    comment: '',
  });
  const [recording, setRecording] = useState({
    vote: '',
    comment: '',
  });
  const [label, setLabel] = useState({
    vote: '',
    comment: '',
  });
  const [privacy, setPrivacy] = useState({
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
  const voteTotal = [copyright, performance, recording, label, privacy].filter(
    (el) => el.vote !== '',
  ).length;

  useEffect(() => {
    console.log('SPLITS', copyright, performance, recording, label);
  }, []);
  const { title, owner } = props.workpiece;
  const ownerName = `${owner.firstName} ${owner.lastName}`;
  const splitOwner = props.workpiece.rightSplit.owner;
  const splitOwnerName = `${splitOwner.firstName} ${splitOwner.lastName}`;
  const { version } = props.workpiece.rightSplit;

  const translation = props.translations.rightSplit.vote;
  const locale = props.user.locale;
  const t_title = translation._title[locale];
  const t_createdBy = translation._createdBy[locale];
  const t_voteCount = translation._voteCount[locale];

  const commonProps = {
    copyright,
    setCopyright,
    performance,
    setPerformance,
    recording,
    setRecording,
    label,
    setLabel,
    privacy,
    setPrivacy,
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
            <ArtistName className="ownerName" user={owner}>{t_createdBy}</ArtistName>
            {/* - Mis à jour il y a
            ----- */}
          </div>
          <div className="version">{`Version ${version}`}</div>
          <div className="workpieceDetails">
            <ArtistName className="ownerName" user={owner}>{t_createdBy}</ArtistName>
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
