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
import PageErrors from '../../_/pageErrors/pageErrors';

const ceil = (el) => Math.floor(el * 10000) / 10000;

const Copyright = (props) => {
  const { workpiece_id } = useParams();
  const [isCreatingNewCollaborator, setIsCreatingNewCollaborator] = useState(
    false,
  );
  const [triedSubmit, setTriedSubmit] = useState(false);

  const addCollaborators = (newCollaborator) => {
    const isCollaboratorAlreadyIn = props.copyright.find(
      (el) => newCollaborator.user_id === el.rightHolder_id,
    );
    if (!isCollaboratorAlreadyIn) {
      let newCopyright = [
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
      ];
      newCopyright = recalculateShares({
        newDividingMethod: props.copyrightDividingMethod,
        copyright: newCopyright,
      });
      newCopyright = setCollaboratorsErrors(newCopyright);
      props.setCopyright(newCopyright);
    }
  };

  const deleteCollaborator = (rightHolder_id) => {
    let newCopyright = props.copyright.filter(
      (el) => el.rightHolder_id !== rightHolder_id,
    );
    newCopyright = recalculateShares({
      newDividingMethod: props.copyrightDividingMethod,
      copyright: newCopyright,
    });
    newCopyright = setCollaboratorsErrors(newCopyright);
    props.setCopyright(newCopyright);
  };

  const addRole = (role, rightHolder_id) => {
    const modifiedCollaborator = props.copyright.find(
      (el) => el.rightHolder_id === rightHolder_id,
    );
    modifiedCollaborator.roles.push(role);
    let newCopyright = props.copyright.map((el) =>
      (el.rightHolder_id === rightHolder_id ? modifiedCollaborator : el));
    newCopyright = recalculateShares({
      newDividingMethod: props.copyrightDividingMethod,
      copyright: newCopyright,
    });
    newCopyright = setCollaboratorsErrors(newCopyright);
    props.setCopyright(newCopyright);
  };

  const deleteRole = (role, rightHolder_id) => {
    const modifiedCollaborator = props.copyright.find(
      (el) => el.rightHolder_id === rightHolder_id,
    );
    modifiedCollaborator.roles = modifiedCollaborator.roles.filter(
      (el) => el !== role,
    );
    let newCopyright = props.copyright.map((el) =>
      (el.rightHolder_id === rightHolder_id ? modifiedCollaborator : el));

    newCopyright = recalculateShares({
      newDividingMethod: props.copyrightDividingMethod,
      copyright: newCopyright,
    });
    newCopyright = setCollaboratorsErrors(newCopyright);
    props.setCopyright(newCopyright);
  };

  const handleSelectDividingMethod = (newDividingMethod) => {
    let newCopyright = recalculateShares({
      newDividingMethod,
      copyright: props.copyright,
    });
    newCopyright = setCollaboratorsErrors(newCopyright);
    props.setCopyright(newCopyright);
    props.selectCopyrightDividingMethod(newDividingMethod);
  };

  const handleDrag = ({ newShares, id }) => {
    let newCopyright = props.copyright;
    if (props.copyrightDividingMethod === 'manual') {
      if (newCopyright[id].lock !== true) {
        const draggedDifferential = newCopyright[id].shares - newShares;
        const notFocussedCollaborators = newCopyright.filter(
          (el, ID) => ID !== id,
        );
        const unLocksCollaborators = notFocussedCollaborators.filter(
          (el) => el.lock !== true,
        );
        const unlockedSharesSum = unLocksCollaborators.reduce(
          (acc, el) => el.shares + acc,
          0,
        );
        const totalSum = newCopyright.reduce((acc, el) => el.shares + acc, 0);
        const sharesToSeparate =
          unlockedSharesSum + draggedDifferential + 100 - totalSum;
        newCopyright = [...newCopyright].map((EL, ID) => {
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
        newCopyright = setCollaboratorsErrors(newCopyright);
        props.setCopyright(newCopyright);
      }
    }
  };

  const title = props.translations.rightSplit.title._copyright[props.language];
  const textPresentation =
    props.translations.rightSplit.textPresentation._copyright[props.language];
  const textDescription =
    props.translations.rightSplit.textDescription._copyright[props.language];

  const sharesTotal = props.copyright.reduce((acc, el) => el.shares + acc, 0);
  const isTotal100 = sharesTotal > 99.999 && sharesTotal < 100.001;
  const shouldDisplayCircle = isTotal100;

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
    triedSubmit,
    setTriedSubmit,
  };

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
              {triedSubmit && (
                <PageErrors
                  {...commonProps}
                  errors={props.calculateCopyrightErrors(props.copyright)}
                />
              )}
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
          {...commonProps}
          errors={props.calculateCopyrightErrors(props.copyright)}
          backUrl={`/workpiece/${workpiece_id}`}
          frontUrl={`/workpiece/${workpiece_id}/right-split/performance`}
        />
      </div>
    </>
  );
};

export default Copyright;
