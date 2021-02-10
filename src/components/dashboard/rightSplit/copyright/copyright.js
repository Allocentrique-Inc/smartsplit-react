import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddCollaborators from '../_/addCollaborators/addCollaborators';
import Circle from '../_/circle/circle';
import TopBar from '../_/topBar/topBar';
import DividingMethod from './dividingMethod/dividingMethod';
import Presentation from '../_/presentation/presentation';
import recalculateShares from '../_/recalculateShares';
import Collaborator from './collaborator/collaborator';
import DownBar from '../_/downBar/downBar';

const style = {
  b1b1: {
    width: '944px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '100px',
    minHeight: '90vh',
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

const ceil = (el) => Math.floor(el * 10000) / 10000;

const Copyright = (props) => {
  const { workpiece_id } = useParams();

  const addCollaborators = (user_id) => {
    const calculatedCopyright = recalculateShares({
      newDividingMethod: props.copyrightDividingMethod,
      copyright: [
        ...props.copyright,
        {
          rightHolder: user_id,
          roles: [],
          comment: '',
          shares: 0,
          lock: false,
        },
      ],
    });
    props.setCopyright(calculatedCopyright);
  };

  const deleteCollaborator = (rightHolder) => {
    const arr = [...props.copyright];
    arr.splice(
      props.copyright.find((el1) => el1.user_id === rightHolder),
      1,
    );
    const calculatedCopyright = recalculateShares({
      newDividingMethod: props.copyrightDividingMethod,
      copyright: arr,
    });
    props.setCopyright(calculatedCopyright);
  };

  const deleteRole = (role, id) => {
    const arr = [...props.copyright];
    arr[id].roles = arr[id].roles.filter((el) => el !== role);
    const calculatedCopyright = recalculateShares({
      newDividingMethod: props.copyrightDividingMethod,
      copyright: arr,
    });
    props.setCopyright(calculatedCopyright);
  };

  const addRole = (role, id) => {
    const arr = [...props.copyright];
    arr[id].roles.push(role);
    const calculatedCopyright = recalculateShares({
      newDividingMethod: props.copyrightDividingMethod,
      copyright: arr,
    });
    props.setCopyright(calculatedCopyright);
  };

  const handleSelectDividingMethod = (newDividingMethod) => {
    const calculatedCopyright = recalculateShares({
      newDividingMethod,
      copyright: props.copyright,
    });
    props.setCopyright(calculatedCopyright);
    props.selectCopyrightDividingMethod(newDividingMethod);
  };

  const handleDrag = ({ newShares, id }) => {
    if (props.copyrightDividingMethod === 'manual') {
      if (props.copyright[id].lock !== true) {
        const draggedDifferential = newShares - props.copyright[id].shares;
        const notFocussed = props.copyright.filter((el, ID) => ID !== id);
        const unLocks = notFocussed.filter((el) => el.lock !== true);
        const unlockedSum = unLocks.reduce((acc, el) => el.shares + acc, 0);
        const sharesToSeparate = unlockedSum - draggedDifferential;
        const arr = [...props.copyright].map((EL, ID) => {
          if (id === ID) {
            EL.shares = ceil(
              sharesToSeparate < 0 ? newShares + sharesToSeparate : newShares,
            );
          } else if (EL.lock !== true) {
            EL.shares = EL.shares === 0
              ? 0
              : sharesToSeparate < 0
                ? 0
                : ceil((EL.shares / unlockedSum) * sharesToSeparate);
            // : ceil((EL.shares) + ((-draggedDifferential) / unLocks.length))
          }
          return EL;
        });
        props.setCopyright(arr);
      }
    }
  };

  const commonProps = {
    workpiece_id,
    addCollaborators,
    deleteCollaborator,
    deleteRole,
    addRole,
    handleSelectDividingMethod,
    handleDrag,
  };

  const title = props.translations.rightSplit.title._copyright[props.language];
  const textPresentation = props.translations.rightSplit.textPresentation._copyright[props.language];
  const textDescription = props.translations.rightSplit.textDescription._copyright[props.language];

  return (
    <div className="rightSplitCreation">
      <TopBar {...props} view="copyright" />
      <div className="b1">
        <div className="b1b1">
          <div className="b1b1b1">
            {/* <Presentation view="copyright" /> */}
            <div className="presentation">
              <div className="presentationB1">
                <div className="logo" />
                <div className="title">{title}</div>
              </div>
              <div className="text1">{textPresentation}</div>
              <div className="text2">{textDescription}</div>
            </div>

            <DividingMethod {...props} {...commonProps} />

            {props.copyright.map((el, id) => {
              // Incomming data is different than PostingData
              const collaborator = typeof el.rightHolder === 'string'
                ? props.collaborators.find(
                  (EL) => EL.user_id === el.rightHolder,
                )
                : el.rightHolder;
              return (
                <Collaborator
                  key={collaborator.user_id}
                  {...props}
                  {...commonProps}
                  el={el}
                  id={id}
                  collaborator={collaborator}
                />
              );
            })}

            <AddCollaborators
              {...props}
              {...commonProps}
              preSelectedCollaborators={props.copyright}
            />
          </div>
          <div style={style.b1b1b2}>
            <div style={style.b1b1b2b1}>
              <Circle {...props} collaborators={props.copyright} />
            </div>
          </div>
        </div>
      </div>
      <DownBar
        backUrl={`/workpiece/${workpiece_id}`}
        frontUrl={`/workpiece/${workpiece_id}/right-split/performance`}
      />
    </div>
  );
};

export default Copyright;
