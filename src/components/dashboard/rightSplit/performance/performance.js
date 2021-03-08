import { useParams } from 'react-router-dom';
import { useState } from 'react';
import AddCollaborators from '../_/addCollaborators/addCollaborators';
import TopBar from '../_/topBar/topBar';
import DownBar from '../_/downBar/downBar';
import Collaborator from './collaborator/collaborator';
import Circle from '../_/circle/circle';
import CreateNewCollaborator from '../_/createNewCollaborator/createNewCollaborator';
import Presentation from '../_/presentation/presentation';
import PageErrors from '../_/pageErrors/pageErrors';
import setCollaboratorsErrors from './_/setCollaboratorsErrors';

const Performance = (props) => {
  const { workpiece_id } = useParams();
  const [isCreatingNewCollaborator, setIsCreatingNewCollaborator] = useState(
    false,
  );
  const [triedSubmit, setTriedSubmit] = useState(false);
  const pageErrors = props.calculatePerformanceErrors(props.performance);

  const addCollaborators = (newCollaborator) => {
    if (
      !props.performance.find(
        (el) => newCollaborator.user_id === el.rightHolder_id,
      )
    ) {
      let newPerformance = [
        ...props.performance,
        {
          rightHolder: newCollaborator,
          rightHolder_id: newCollaborator.user_id,
          roles: [],
          comment: '',
          status: '',
          shares: 10,
        },
      ];
      newPerformance = setCollaboratorsErrors(newPerformance);
      props.setPerformance(newPerformance);
    }
  };

  const deleteCollaborator = (rightHolder_id) => {
    let newPerformance = [...props.performance].filter(
      (el) => el.rightHolder_id !== rightHolder_id,
    );
    newPerformance = setCollaboratorsErrors(newPerformance);
    props.setPerformance(newPerformance);
  };

  const deleteRole = (role, rightHolder_id) => {
    const modifiedPerformance = props.performance.find(
      (el) => el.rightHolder_id === rightHolder_id,
    );
    modifiedPerformance.roles = modifiedPerformance.roles.filter(
      (el) => el !== role,
    );
    const newPerformance = props.performance.map((el) =>
      (el.rightHolder_id === rightHolder_id ? modifiedPerformance : el));
    props.setPerformance(newPerformance);
  };

  const addRole = (role, rightHolder_id) => {
    const modifiedPerformance = props.performance.find(
      (el) => el.rightHolder_id === rightHolder_id,
    );
    modifiedPerformance.roles.push(role);
    const newPerformance = props.performance.map((el) =>
      (el.rightHolder_id === rightHolder_id ? modifiedPerformance : el));
    props.setPerformance(newPerformance);
  };

  // SHARES CALCULATION
  const mainActorsTotal = props.performance.reduce(
    (acc, el) =>
      (el.status === 'principal' || el.status === 'featured' ? acc + 1 : acc),
    0,
  );
  const remainingActorsTotal = props.performance.length - mainActorsTotal;
  props.performance.forEach((el, id, arr) => {
    if (el.status === 'principal' || el.status === 'featured') {
      el.shares = (remainingActorsTotal > 0 ? 80 : 100) / mainActorsTotal;
    } else {
      el.shares = (mainActorsTotal > 0 ? 20 : 100) / remainingActorsTotal;
    }
  });

  const t_title =
    props.translations.rightSplit.title._performance[props.language];
  const t_presentation =
    props.translations.rightSplit.presentation._performance[props.language];
  const t_description =
    props.translations.rightSplit.description._performance[props.language];

  const commonProps = {
    ...props,
    deleteCollaborator,
    deleteRole,
    addRole,
    addCollaborators,
    isCreatingNewCollaborator,
    setIsCreatingNewCollaborator,
    t_title,
    t_presentation,
    t_description,
    triedSubmit,
    setTriedSubmit,
  };

  return (
    <>
      {isCreatingNewCollaborator && <CreateNewCollaborator {...commonProps} />}
      <div className="rightSplitCreation">
        <TopBar {...commonProps} view="performance" errors={pageErrors} />
        <div className="b1">
          <div className="b1b1">
            <div className="b1b1b1">
              <Presentation {...commonProps} view="performance" />
              {props.performance.map((collaborator, id) => (
                <Collaborator
                  key={collaborator.rightHolder_id}
                  {...commonProps}
                  id={id}
                  collaborator={collaborator}
                />
              ))}
              <AddCollaborators
                {...commonProps}
                preSelectedCollaborators={props.performance}
              />
              {triedSubmit && (
                <PageErrors {...commonProps} errors={pageErrors} />
              )}
            </div>
            <div className="b1b1b2">
              <div className="b1b1b1b2">
                <Circle {...commonProps} collaborators={props.performance} />
              </div>
            </div>
          </div>
        </div>
        <div />
        <DownBar
          {...commonProps}
          errors={pageErrors}
          backUrl={`/workpiece/${workpiece_id}/right-split/copyright`}
          frontUrl={`/workpiece/${workpiece_id}/right-split/recording`}
        />
      </div>
    </>
  );
};

export default Performance;
