import { useMajorContributors, useMinorContributors } from './hooks';

const recalculateShares = ({ performance, setPerformance, dividingMethod }) => {
  const majorShares = useMajorContributors(performance);
  const minorShares = useMinorContributors(performance);
  const activeCollaborators = [...majorShares, ...minorShares];
  let splitChanged = false;
  const isActive = (collaborator) =>
    activeCollaborators.some(
      (activeCollaborator) =>
        activeCollaborators.rightHolder_id === collaborator.rightHolder_id,
    );
  const isMajor = (collaborator) =>
    majorShares.some(
      (majorCollaborator) =>
        majorCollaborator.rightHolder_id === collaborator.rightHolder_id,
    );
  if (dividingMethod === 'equal') {
    performance.forEach((collaborator) => {
      if (!isActive(collaborator)) {
        return;
      }
      const oldValue = collaborator.shares;
      collaborator.shares =
        Math.floor((100 / activeCollaborators.length) * 10000) / 10000;
      splitChanged = collaborator.shares !== oldValue;
    });
  } else if (dividingMethod === '80-20') {
    performance.forEach((collaborator) => {
      if (!isActive(collaborator)) {
        return;
      }
      const oldValue = collaborator.shares;
      collaborator.shares = isMajor(collaborator)
        ? Math.floor(
            ((0.8 * activeCollaborators.length) / majorShares.length) * 10000,
          ) / 10000
        : Math.floor(
            ((0.2 * activeCollaborators.length) / minorShares.length) * 10000,
          ) / 10000;
      if (!splitChanged) {
        splitChanged = collaborator.shares !== oldValue;
      }
    });
  }
  console.log(
    'END OF RECALCULTATION',
    performance,
    splitChanged,
    majorShares,
    minorShares,
  );
  splitChanged && setPerformance([...performance]);
};

export default recalculateShares;
