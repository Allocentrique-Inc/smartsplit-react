import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddCollaborators from '../_/addCollaborators/addCollaborators';
import TopBar from '../_/topBar/topBar';
import DownBar from '../_/downBar/downBar';
import Collaborator from './collaborator/collaborator';
import Circle from '../_/circle/circle';
import CreateNewCollaborator from '../_/createNewCollaborator/createNewCollaborator';
import Presentation from '../_/presentation/presentation';
import PageErrors from '../_/pageErrors/pageErrors';
import setCollaboratorsErrors from './_/setCollaboratorsErrors';
import CircledStar from '../../../../icons/circledStar';
import SplitChart from '../_/charts/splitChart/splitChart';
import { rightHoldersToChartData } from '../_/charts/utils';
import computeDividingMethod from './_/computeDividingMethod';
import recalculateShares from './_/recalculateShares';

const Performance = (props) => {
  const { performance, setPerformance } = props;
  const { workpiece_id } = useParams();
  const [isCreatingNewCollaborator, setIsCreatingNewCollaborator] = useState(
    false,
  );
  const [triedSubmit, setTriedSubmit] = useState(false);
  const pageErrors = props.calculatePerformanceErrors(performance);
  // const [dividingMethod, setDividingMethod] = useState();
  const dividingMethod = computeDividingMethod(performance);

  // const dividingMethod = computeDividingMethod(props.perf)
  useEffect(() => {
    recalculateShares({
      performance,
      setPerformance,
      dividingMethod,
    });
  }, [performance.length]);

  const addCollaborators = (newCollaborator) => {
    if (
      !performance.find((el) => newCollaborator.user_id === el.rightHolder_id)
    ) {
      let newPerformance = [
        ...performance,
        {
          rightHolder: newCollaborator,
          rightHolder_id: newCollaborator.user_id,
          roles: [],
          comment: '',
          status: '',
          shares: 0,
        },
      ];
      newPerformance = setCollaboratorsErrors(newPerformance);
      setPerformance(newPerformance);
    }
  };

  const deleteCollaborator = (rightHolder_id) => {
    const newPerformance = [...performance].filter(
      (el) => el.rightHolder_id !== rightHolder_id,
    );
    setPerformance(newPerformance);
  };
  const addRole = (role, id) => {
    const index = performance.findIndex(
      (collaborator) => collaborator.rightHolder_id === id,
    );
    if (index === -1) return;
    performance[index].roles.push(role);
    setPerformance([...performance]);
  };
  const deleteRole = (role, id) => {
    const index = performance.findIndex(
      (collaborator) => collaborator.rightHolder_id === id,
    );
    if (index === -1) return;
    const roleIndex = performance[index].roles.findIndex((el) => el === role);
    performance[index].roles.splice(index, 1);
    setPerformance([...performance]);
  };
  // SHARES CALCULATION
  // const mainActorsTotal = performance.reduce(
  //   (acc, el) =>
  //     el.status === 'principal' || el.status === 'featured' ? acc + 1 : acc,
  //   0,
  // );
  // const remainingActorsTotal = performance.length - mainActorsTotal;
  // performance.forEach((el, id, arr) => {
  //   if (el.status === 'principal' || el.status === 'featured') {
  //     el.shares = (remainingActorsTotal > 0 ? 80 : 100) / mainActorsTotal;
  //   } else {
  //     el.shares = (mainActorsTotal > 0 ? 20 : 100) / remainingActorsTotal;
  //   }
  // });

  const sharesTotal = performance.reduce((acc, el) => el.shares + acc, 0);
  const isTotal100 = sharesTotal > 99.999 && sharesTotal < 100.001;
  const shouldDisplayPieChart = isTotal100;

  const t_title =
    props.translations.rightSplit.title._performance[props.language];
  const t_presentation =
    props.translations.rightSplit.presentation._performance[props.language];
  const t_description =
    props.translations.rightSplit.description._performance[props.language];

  const commonProps = {
    ...props,
    deleteCollaborator,
    addCollaborators,
    isCreatingNewCollaborator,
    setIsCreatingNewCollaborator,
    t_title,
    t_presentation,
    t_description,
    triedSubmit,
    setTriedSubmit,
    chartData: rightHoldersToChartData(
      performance,
      props.activeCollaboratorsIds,
    ),
    logo: CircledStar,
    startAngle: dividingMethod === 'equal' ? 0 : 216,
    size: 384,
    dividingMethod,
    addRole,
    deleteRole,
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
              {performance.map((collaborator, id) => (
                <Collaborator
                  key={collaborator.rightHolder_id}
                  {...commonProps}
                  id={id}
                  collaborator={collaborator}
                />
              ))}
              <AddCollaborators
                {...commonProps}
                preSelectedCollaborators={performance}
              />
              {triedSubmit && (
                <PageErrors {...commonProps} errors={pageErrors} />
              )}
            </div>
            {!props.isMobile && (
              <div className="b1b1b2">
                <div className="b1b1b1b2">
                  {shouldDisplayPieChart && <SplitChart {...commonProps} />}
                </div>
              </div>
            )}
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
