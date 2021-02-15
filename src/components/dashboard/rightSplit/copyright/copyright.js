import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddCollaborators from '../_/addCollaborators/addCollaborators';
import Circle from '../_/circle/circle';
import TopBar from '../_/topBar/topBar';
import DividingMethod from './dividingMethod/dividingMethod';
import recalculateShares from '../_/recalculateShares';
import Collaborator from './collaborator/collaborator';
import DownBar from '../_/downBar/downBar';
import CreateNewCollaborator from '../_/createNewCollaborator/createNewCollaborator';
import Presentation from '../_/presentation/presentation';

const ceil = (el) => Math.floor(el * 10000) / 10000;

const Copyright = (props) => {
  const { workpiece_id } = useParams();
  const [isCreatingNewCollaborator, setIsCreatingNewCollaborator] = useState(
    false,
  );
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
      props.copyright.reduce(
        (acc, el1, id) => (el1.rightHolder === rightHolder ? id : acc),
        0,
      ),
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
        const draggedDifferential = props.copyright[id].shares - newShares;
        const notFocussedCollaborators = props.copyright.filter(
          (el, ID) => ID !== id,
        );
        const unLocksCollaborators = notFocussedCollaborators.filter(
          (el) => el.lock !== true,
        );
        const unlockedSharesSum = unLocksCollaborators.reduce(
          (acc, el) => el.shares + acc,
          0,
        );
        const totalSum = props.copyright.reduce(
          (acc, el) => el.shares + acc,
          0,
        );
        const sharesToSeparate = unlockedSharesSum + draggedDifferential + 100 - totalSum;
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
                : ceil((EL.shares / unlockedSharesSum) * sharesToSeparate);
          }
          return EL;
        });
        props.setCopyright(arr);
      }
    }
  };

  const title = props.translations.rightSplit.title._copyright[props.language];
  const textPresentation = props.translations.rightSplit.textPresentation._copyright[props.language];
  const textDescription = props.translations.rightSplit.textDescription._copyright[props.language];

  const commonProps = {
    ...props,
    workpiece_id,
    addCollaborators,
    deleteCollaborator,
    deleteRole,
    addRole,
    handleSelectDividingMethod,
    handleDrag,
    isCreatingNewCollaborator,
    setIsCreatingNewCollaborator,
    title,
    textPresentation,
    textDescription,
  };

  // const isAllHaveStatus = !props.copyright.some((el) => el.roles.length === 0);
  // const isAllHaveNonNaN = !props.copyright.some((el) => Number.isNaN(el.shares));
  const sharesTotal = props.copyright.reduce((acc, el) => el.shares + acc, 0);
  const isTotal100 = sharesTotal > 99.999 && sharesTotal < 100.001;
  const shouldDisplayCircle = isTotal100;
  return (
    <>
      {/* CREATE NEW COLLABORATOR */}
      {isCreatingNewCollaborator && <CreateNewCollaborator {...commonProps} />}
      <div className="rightSplitCreation">
        <TopBar {...commonProps} view="copyright" />
        <div className="b1">
          <div className="b1b1">
            <div className="b1b1b1">
              <Presentation {...commonProps} />
              <DividingMethod {...commonProps} />
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
                    {...commonProps}
                    el={el}
                    id={id}
                    collaborator={collaborator}
                  />
                );
              })}

              <AddCollaborators
                {...commonProps}
                preSelectedCollaborators={props.copyright}
              />
            </div>
            <div className="b1b1b2">
              <div className="b1b1b1b2">
                {shouldDisplayCircle && (
                  <Circle {...commonProps} collaborators={props.copyright} />
                )}
              </div>
            </div>
          </div>
        </div>
        <DownBar
          backUrl={`/workpiece/${workpiece_id}`}
          frontUrl={`/workpiece/${workpiece_id}/right-split/performance`}
        />
      </div>
    </>
  );
};

export default Copyright;
