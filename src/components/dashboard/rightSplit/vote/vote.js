import { useState } from 'react';
import Title from './title/title';
import Creation from './creation/creation';
import SplitOwner from './splitOwner/splitOwner';
import Consult from '../consult/consult';
import DownBar from './downBar/downBar';

const Vote = (props) => {
  const [copyright, setCopyright] = useState('');
  const [performance, setPerformance] = useState('');
  const [recording, setRecording] = useState('');
  const [label, setLabel] = useState('');
  const [privacy, setPrivacy] = useState('');
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
  const { title, owner } = props.workpiece;
  const ownerName = `${owner.firstName} ${owner.lastName}`;
  const splitOwner = props.workpiece.rightSplit.owner;
  const splitOwnerName = `${splitOwner.firstName} ${splitOwner.lastName}`;
  const { version } = props.workpiece.rightSplit;
  console.log(props);
  return (
    <div className="vote">
      <div className="b1">
        <div className="inner">
          <div className="voteTitle">{`Valider le split de ${title}`}</div>
          <div className="workpieceDetails">
            Créé par
            <span className="ownerName">{ownerName}</span>
            - Mis à jour il y a
            -----
          </div>
          <div className="version">{`Version ${version}`}</div>
          <div className="workpieceDetails">
            Créé par
            <span className="ownerName">{splitOwnerName}</span>
            - il y a -----
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
