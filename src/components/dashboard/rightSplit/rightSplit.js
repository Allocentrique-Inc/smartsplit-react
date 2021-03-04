import { useState, useEffect } from 'react';
import { useParams, Route, useHistory, useRouteMatch } from 'react-router-dom';
import getUsersCollaborators from '../../../api/users/getUsersCollaborators';
import postRightSplit from '../../../api/workpieces/postRightSplit';
import Copyright from './copyright/copyright';
import Performance from './performance/performance';
import Recording from './recording/recording';
import Privacy from './privacy/privacy';
import Summary from './summary/summary';
import Consult from './consult/consult';
import Vote from './vote/vote';
import translations from '../../../translations';

const RightSplit = (props) => {
  const { language } = props;
  const { workpiece_id } = useParams();
  const matchCopyright = useRouteMatch(
    '/workpiece/:workpiece_id/right-split/copyright',
  );
  const matchPerformance = useRouteMatch(
    '/workpiece/:workpiece_id/right-split/performance',
  );
  const matchRecording = useRouteMatch(
    '/workpiece/:workpiece_id/right-split/recording',
  );
  const matchPrivacy = useRouteMatch(
    '/workpiece/:workpiece_id/right-split/privacy',
  );
  const user_id = localStorage.getItem('user_id');
  const history = useHistory();
  const [copyright, setCopyright] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [recording, setRecording] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [label, setLabel] = useState({});
  const [copyrightDividingMethod, selectCopyrightDividingMethod] = useState(
    'equal',
  );
  const [warnings, setWarnings] = useState([]);
  const mapData = async () => {
    if (props.workpiece.rightSplit) {
      const {
        copyright,
        performance,
        recording,
        copyrightDividingMethod,
        privacy,
        label,
        isPublic,
      } = props.workpiece.rightSplit;
      setCopyright(copyright);
      setPerformance(performance);
      setRecording(recording);
      selectCopyrightDividingMethod(copyrightDividingMethod);
      setLabel(label || {});
      setIsPublic(isPublic);
    }
    const collaborators = await getUsersCollaborators({ user_id });
    setCollaborators([props.user, ...collaborators]);
  };
  useEffect(() => {
    mapData();
  }, [props.workpiece]);

  const saveRightSplit = async () => {
    const payload = {
      workpiece_id,
      copyright,
      performance,
      recording,
      copyrightDividingMethod,
      label,
      isPublic,
    };
    await postRightSplit(payload);
    props.resetData();
  };

  let activeCollaborators = [...copyright, ...performance, ...recording];
  if (label.rightHolder_id) {
    activeCollaborators.push(label);
  }
  activeCollaborators = activeCollaborators.reduce((acc, el) => {
    if (acc.find((EL) => EL.rightHolder_id === el.rightHolder_id)) {
      return acc;
    }
    return [...acc, el];
  }, []);
  const activeCollaboratorsIds = activeCollaborators.map(
    (el) => el.rightHolder_id,
  );

  const calculateCopyrightErrors = (copyright) => {
    const pageErrors = [];
    // TOTAL OF SHARES SHALL BE EQUAL OR CLOSE TO 100
    if (copyright.length > 0) {
      const sharesTotal = copyright.reduce((acc, el) => el.shares + acc, 0);
      const isTotal100 = sharesTotal > 99.999 && sharesTotal < 100.001;
      if (!isTotal100) {
        pageErrors.push('SharesTotalShallBe100');
      }
    }

    // ALL COLLABORATORS SHALL BE ERROR LESS
    const hasCollaboratorErrors = copyright.some(
      (el) => el.errors && el.errors.length > 0,
    );
    if (hasCollaboratorErrors) {
      pageErrors.push('AllShallBeErrorless');
    }

    return pageErrors;
  };

  const calculatePerformanceErrors = (performance) => {
    const pageErrors = [];

    // TOTAL OF SHARES SHALL BE EQUAL OR CLOSE TO 100
    if (performance.length > 0) {
      const sharesTotal = performance.reduce((acc, el) => el.shares + acc, 0);
      const isTotal100 = sharesTotal > 99.999 && sharesTotal < 100.001;
      if (!isTotal100) {
        pageErrors.push('SharesTotalShallBe100');
      }
    }

    // ALL COLLABORATORS SHALL BE ERROR LESS
    const hasCollaboratorErrors = performance.some(
      (el) => el.errors && el.errors.length > 0,
    );
    if (hasCollaboratorErrors) {
      pageErrors.push('AllShallBeErrorless');
    }

    return pageErrors;
  };

  const calculateRecordingErrors = (recording, label) => {
    const pageErrors = [];

    // ALL COLLABORATORS SHALL BE ERROR LESS
    const hasCollaboratorErrors =
      recording.some((el) => el.errors && el.errors.length > 0) ||
      (label.errors && label.errors.length > 0);

    if (hasCollaboratorErrors) {
      pageErrors.push('AllShallBeErrorless');
    }

    // TOTAL OF SHARES SHALL BE EQUAL OR CLOSE TO 100
    const allActors = [...recording];
    if (label && label.rightHolder) {
      allActors.push(label);
    }
    if (allActors.length > 0) {
      const allActorsSum = allActors.reduce((acc, el) => el.shares + acc, 0);
      const isTotal100 = allActorsSum > 99.999 && allActorsSum < 100.001;
      if (!isTotal100) {
        pageErrors.push('SharesTotalShallBe100');
      }
    }

    return pageErrors;
  };

  const calculateFlowErrors = () => {
    const flowErrors = [];
    // NO PAGE SHALL HAVE ERRORS OR SHALL BE REDIRECTED TO THE PAGE
    if (calculateCopyrightErrors(copyright).length > 0) {
      flowErrors.push('NoPageShallBeInError');
      if (matchPerformance || matchRecording || matchPrivacy) {
        history.push(`/workpiece/${workpiece_id}/right-split/copyright`);
      }
    }
    if (calculatePerformanceErrors(performance).length > 0) {
      flowErrors.push('NoPageShallBeInError');
      if (matchRecording || matchPrivacy) {
        history.push(`/workpiece/${workpiece_id}/right-split/performance`);
      }
    }
    if (calculateRecordingErrors(recording, label).length > 0) {
      flowErrors.push('NoPageShallBeInError');
      if (matchPrivacy) {
        history.push(`/workpiece/${workpiece_id}/right-split/recording`);
      }
    }

    // SHALL INCLUDE AT LEAST ONE COLLABORATOR
    const allActors = [...copyright, ...performance, ...recording];
    if (label && label.rightHolder) {
      allActors.push(label);
    }

    if (allActors.length === 0) {
      flowErrors.push('ShallIncludeAtLeastOneCollaborator');
    }

    return flowErrors;
  };

  const commonProps = {
    ...props,
    copyright,
    setCopyright,
    performance,
    setPerformance,
    recording,
    setRecording,
    collaborators,
    setCollaborators,
    mapData,
    saveRightSplit,
    copyrightDividingMethod,
    selectCopyrightDividingMethod,
    label,
    setLabel,
    translations,
    language,
    activeCollaboratorsIds,
    warnings,
    setWarnings,
    calculateCopyrightErrors,
    calculatePerformanceErrors,
    calculateRecordingErrors,
    calculateFlowErrors,
    isPublic,
    setIsPublic,
  };
  return (
    <>
      <Route path="/workpiece/:workpiece_id/right-split/consult">
        <Consult {...commonProps} voting />
      </Route>
      <Route path="/workpiece/:workpiece_id/right-split/copyright">
        <Copyright {...commonProps} />
      </Route>
      <Route path="/workpiece/:workpiece_id/right-split/performance">
        <Performance {...commonProps} />
      </Route>
      <Route path="/workpiece/:workpiece_id/right-split/recording">
        <Recording {...commonProps} />
      </Route>
      <Route path="/workpiece/:workpiece_id/right-split/privacy">
        <Privacy {...commonProps} />
      </Route>
      <Route path="/workpiece/:workpiece_id/right-split/summary">
        <Summary {...commonProps} />
      </Route>
      <Route path="/workpiece/:workpiece_id/right-split/vote">
        <Vote {...commonProps} />
      </Route>
    </>
  );
};

export default RightSplit;
