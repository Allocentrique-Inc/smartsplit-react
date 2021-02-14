import { useParams } from 'react-router-dom';
import { useState } from 'react';
import AddCollaborators from '../_/addCollaborators/addCollaborators';
import TopBar from '../_/topBar/topBar';
import DownBar from '../_/downBar/downBar';
import Collaborators from './collaborators/collaborators';
import Circle from '../_/circle/circle';
import CreateNewCollaborator from '../_/createNewCollaborator/createNewCollaborator';
import Presentation from '../_/presentation/presentation';

const Performance = (props) => {
  const { workpiece_id } = useParams();
  const [isCreatingNewCollaborator, setIsCreatingNewCollaborator] = useState(
    false,
  );
  const addCollaborators = (user_id) => {
    props.setPerformance([
      ...props.performance,
      {
        rightHolder: user_id,
        roles: [],
        comment: '',
        status: '',
        shares: 10,
      },
    ]);
  };
  const deleteCollaborator = (rightHolder) => {
    const arr = [...props.performance];
    arr.splice(
      props.performance.find((el1) => el1.user_id === rightHolder),
      1,
    );
    props.setPerformance(arr);
  };
  const deleteRole = (role, id) => {
    const arr = [...props.performance];
    arr[id].roles = arr[id].roles.filter((el) => el !== role);
    props.setPerformance(arr);
  };
  const addRole = (role, id) => {
    const arr = [...props.performance];
    arr[id].roles.push(role);
    props.setPerformance(arr);
  };

  // SHARES CALCULATION
  const mainActorsTotal = props.performance.reduce(
    (acc, el) => (el.status === 'principal' || el.status === 'featured' ? acc + 1 : acc),
    0,
  );
  const restTotal = props.performance.length - mainActorsTotal;
  props.performance.forEach((el, id, arr) => {
    if (el.status === 'principal' || el.status === 'featured') {
      el.shares = 80 / mainActorsTotal;
    } else {
      el.shares = 20 / restTotal;
    }
  });

  const title = props.translations.rightSplit.title._performance[props.language];
  const textPresentation = props.translations.rightSplit.textPresentation._performance[props.language];
  const textDescription = props.translations.rightSplit.textDescription._performance[props.language];

  const commonProps = {
    ...props,
    deleteCollaborator,
    deleteRole,
    addRole,
    addCollaborators,
    isCreatingNewCollaborator,
    setIsCreatingNewCollaborator,
    title,
    textPresentation,
    textDescription,
  };
  return (
    <>
      {isCreatingNewCollaborator && <CreateNewCollaborator {...commonProps} />}
      <div className="rightSplitCreation">
        <TopBar {...commonProps} view="performance" />
        <div className="b1">
          <div className="b1b1">
            <div className="b1b1b1">
              <Presentation {...commonProps} />
              <Collaborators {...commonProps} />
              <AddCollaborators
                {...commonProps}
                preSelectedCollaborators={props.performance}
              />
            </div>
            <div className="b1b1b2">
              <div className="b1b1b1b2">
                <Circle collaborators={props.performance} />
              </div>
            </div>
          </div>
        </div>
        <div />
        <DownBar
          backUrl={`/workpiece/${workpiece_id}/right-split/copyright`}
          frontUrl={`/workpiece/${workpiece_id}/right-split/recording`}
        />
      </div>
    </>
  );
};

export default Performance;
