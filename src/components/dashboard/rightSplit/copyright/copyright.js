import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddCollaborators from '../_/addCollaborators/addCollaborators';
import Circle from '../_/circle/circle';
import TopBar from '../_/topBar/topBar';
import DividingMethod from './dividingMethod/dividingMethod';
import recalculateShares from './_/recalculateShares';
import setCollaboratorsErrors from './_/setCollaboratorsErrors';
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
  const addCollaborators = (newCollaborator) => {
    if (
      !props.copyright.find(
        (el) => newCollaborator.user_id === el.rightHolder_id,
      )
    ) {
      let calculatedCopyright = recalculateShares({
        newDividingMethod: props.copyrightDividingMethod,
        copyright: [
          ...props.copyright,
          {
            rightHolder: newCollaborator,
            rightHolder_id: newCollaborator.user_id,
            roles: [],
            comment: '',
            shares: 0,
            lock: false,
            errors: [],
          },
        ],
      });
      calculatedCopyright = setCollaboratorsErrors(calculatedCopyright);
      props.setCopyright(calculatedCopyright);
    }
  };

  const deleteCollaborator = (rightHolder_id) => {
    const newCopyright = props.copyright.filter(
      (el) => el.rightHolder_id !== rightHolder_id,
    );
    let calculatedCopyright = recalculateShares({
      newDividingMethod: props.copyrightDividingMethod,
      copyright: newCopyright,
    });
    calculatedCopyright = setCollaboratorsErrors(calculatedCopyright);
    props.setCopyright(calculatedCopyright);
  };

  const deleteRole = (role, rightHolder_id) => {
    const modifiedCollaborator = props.copyright.find(
      (el) => el.rightHolder_id === rightHolder_id,
    );
    modifiedCollaborator.roles = modifiedCollaborator.roles.filter(
      (el) => el !== role,
    );
    const newCopyright = props.copyright.map((el) =>
      (el.rightHolder_id === rightHolder_id ? modifiedCollaborator : el));

    let calculatedCopyright = recalculateShares({
      newDividingMethod: props.copyrightDividingMethod,
      copyright: newCopyright,
    });
    calculatedCopyright = setCollaboratorsErrors(calculatedCopyright);

    props.setCopyright(calculatedCopyright);
  };

  const addRole = (role, rightHolder_id) => {
    const modifiedCollaborator = props.copyright.find(
      (el) => el.rightHolder_id === rightHolder_id,
    );
    modifiedCollaborator.roles.push(role);
    const newCopyright = props.copyright.map((el) =>
      (el.rightHolder_id === rightHolder_id ? modifiedCollaborator : el));

    let calculatedCopyright = recalculateShares({
      newDividingMethod: props.copyrightDividingMethod,
      copyright: newCopyright,
    });
    calculatedCopyright = setCollaboratorsErrors(calculatedCopyright);
    props.setCopyright(calculatedCopyright);
  };

  const handleSelectDividingMethod = (newDividingMethod) => {
    let calculatedCopyright = recalculateShares({
      newDividingMethod,
      copyright: props.copyright,
    });
    calculatedCopyright = setCollaboratorsErrors(calculatedCopyright);
    props.setCopyright(calculatedCopyright);
    props.selectCopyrightDividingMethod(newDividingMethod);
  };

  const handleDrag = ({ newShares, id }) => {
    let copyright = props.copyright;

    if (props.copyrightDividingMethod === 'manual') {
      if (copyright[id].lock !== true) {
        const draggedDifferential = copyright[id].shares - newShares;
        const notFocussedCollaborators = copyright.filter(
          (el, ID) => ID !== id,
        );
        const unLocksCollaborators = notFocussedCollaborators.filter(
          (el) => el.lock !== true,
        );
        const unlockedSharesSum = unLocksCollaborators.reduce(
          (acc, el) => el.shares + acc,
          0,
        );
        const totalSum = copyright.reduce((acc, el) => el.shares + acc, 0);
        const sharesToSeparate =
          unlockedSharesSum + draggedDifferential + 100 - totalSum;
        copyright = [...copyright].map((EL, ID) => {
          if (id === ID) {
            EL.shares = ceil(
              sharesToSeparate < 0 ? newShares + sharesToSeparate : newShares,
            );
          } else if (EL.lock !== true) {
            EL.shares =
              EL.shares === 0
                ? 0
                : sharesToSeparate < 0
                  ? 0
                  : ceil((EL.shares / unlockedSharesSum) * sharesToSeparate);
          }
          return EL;
        });
        copyright = setCollaboratorsErrors(copyright);
        props.setCopyright(copyright);
      }
    }
  };

  const title = props.translations.rightSplit.title._copyright[props.language];
  const textPresentation =
    props.translations.rightSplit.textPresentation._copyright[props.language];
  const textDescription =
    props.translations.rightSplit.textDescription._copyright[props.language];

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
      {isCreatingNewCollaborator && <CreateNewCollaborator {...commonProps} />}
      <div className="rightSplitCreation">
        <TopBar {...commonProps} view="copyright" />
        <div className="b1">
          <div className="b1b1">
            <div className="b1b1b1">
              <Presentation {...commonProps} view="copyright" />
              <DividingMethod {...commonProps} />
              {props.copyright.map((collaborator, id) => (
                <Collaborator
                  key={collaborator.rightHolder_id}
                  {...commonProps}
                  id={id}
                  collaborator={collaborator}
                />
              ))}
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
