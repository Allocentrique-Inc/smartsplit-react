import { useState, useEffect } from 'react';
import Title from './title/title';
import Creation from './creation/creation';
import SplitOwner from './splitOwner/splitOwner';
import Consult from '../consult/consult';
import DownBar from './downBar/downBar';

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
    vote: 'accepted',
    comment: '',
  });
  const [privacy, setPrivacy] = useState({
    vote: '',
    comment: '',
  });
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
  };
  useEffect(() => {
    console.log('SPLITS', copyright, performance, recording, label);
  }, []);
  const { title, owner } = props.workpiece;
  const ownerName = `${owner.firstName} ${owner.lastName}`;
  const splitOwner = props.workpiece.rightSplit.owner;
  const splitOwnerName = `${splitOwner.firstName} ${splitOwner.lastName}`;
  const { version } = props.workpiece.rightSplit;
  console.log('VOTE PAGE PROPS', props);
  return (
    <div className="vote">
      <div className="b1">
        <div className="inner">
          <div className="voteTitle">{`Valider le split de ${title}`}</div>
          <div className="workpieceDetails">
            Créé par
            <span className="ownerName">{ownerName}</span>- Mis à jour il y a
            -----
          </div>
          <div className="version">{`Version ${version}`}</div>
          <div className="workpieceDetails">
            Créé par
            <span className="ownerName">{splitOwnerName}</span>- il y a -----
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
