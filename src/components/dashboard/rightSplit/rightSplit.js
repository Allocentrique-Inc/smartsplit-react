import { useState, useEffect } from 'react';
import { useParams, Route } from 'react-router-dom';
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
  const { workpiece_id } = useParams();
  const user_id = localStorage.getItem('user_id');
  const [copyright, setCopyright] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [recording, setRecording] = useState([]);
  const [privacy, setPrivacy] = useState('private');
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
      } = props.workpiece.rightSplit;
      setCopyright(copyright);
      setPerformance(performance);
      setRecording(recording);
      selectCopyrightDividingMethod(copyrightDividingMethod);
      setPrivacy(privacy);
      setLabel(label || {});
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
      privacy,
      copyrightDividingMethod,
      label,
    };
    await postRightSplit(payload);
    props.resetData();
  };

  const language = 'fr';

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
      pageErrors.push('AllShallHaveBeErrorLess');
    }

    return pageErrors;
  };

  const calculatePerformanceErrors = (performance) => {
    const pageErrors = [];

    // TOTAL OF SHARES SHALL BE EQUAL OR CLOSE TO 100
    const sharesTotal = performance.reduce((acc, el) => el.shares + acc, 0);
    const isTotal100 = sharesTotal > 99.999 && sharesTotal < 100.001;
    if (!isTotal100) {
      pageErrors.push('SharesTotalShallBe100');
    }

    // ALL COLLABORATORS SHALL BE ERROR LESS
    const hasCollaboratorErrors = performance.some(
      (el) => el.errors && el.errors.length > 0,
    );
    if (hasCollaboratorErrors) {
      pageErrors.push('AllShallHaveBeErrorLess');
    }

    return pageErrors;
  };

  const calculateRecordingErrors = (recording, label) => {
    const pageErrors = [];

    // TOTAL OF SHARES SHALL BE EQUAL OR CLOSE TO 100
    // const sharesTotal = copyright.reduce((acc, el) => el.shares + acc, 0);
    // const isTotal100 = sharesTotal > 99.999 && sharesTotal < 100.001;
    // if (!isTotal100) {
    //   pageErrors.push('SharesTotalShallBe100');
    // }

    return pageErrors;
  };

  const commonProps = {
    ...props,
    copyright,
    setCopyright,
    performance,
    setPerformance,
    recording,
    setRecording,
    privacy,
    setPrivacy,
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
