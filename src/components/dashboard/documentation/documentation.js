import { useState, useEffect } from 'react';
import { useParams, useHistory, Route, Switch } from 'react-router-dom';
import translations from '../../../translations';
import Creation from './creation/creation';
import Performance from './performance/performance';
import Recording from './recording/recording';
import Release from './release/release';
import Files from './files/files';
import Info from './info/info';
import Lyrics from './lyrics/lyrics';
import Streaming from './streaming/streaming';
import patchDocumentation from '../../../api/workpieces/patchDocumentation';
import TopBar from '../_/topBar/topBar';

const Documentation = (props) => {
  console.log(props);
  const { workpiece_id } = useParams();
  const history = useHistory();
  const language = 'fr';
  const [creation, setCreation] = useState({
    date: '',
    authors: [],
    composers: [],
    publishers: [],
    iswc: '',
  });
  const [performance, setPerformance] = useState({
    conductor: '',
    performers: [],
  });
  const [recording, setRecording] = useState({
    directors: [],
    producers: [],
    isrc: '',
    recording: [],
    mixing: [],
    mastering: [],
  });
  const [release, setRelease] = useState({
    date: '',
    label: '',
    format: '',
    support: '',
    distributor: '',
    upc: '',
  });
  const [files, setFiles] = useState({
    art: [],
    audio: [],
    scores: [],
    midi: [],
    lyrics: [],
  });
  const [info, setInfo] = useState({
    length: '',
    BPM: -1,
    mainGenre: null,
    secondaryGenre: null,
    influences: [],
  });
  const [lyrics, setLyrics] = useState({
    text: '',
    languages: [],
    access: 'public',
  });
  const [streaming, setStreaming] = useState({
    links: [],
  });
  const setters = {
    creation: setCreation,
    performance: setPerformance,
    recording: setRecording,
    release: setRelease,
    files: setFiles,
    info: setInfo,
    lyrics: setLyrics,
    streaming: setStreaming,
  };
  const setField = (type, field) => {
    setters[type]((prevState) => ({ ...prevState, ...field }));
  };

  const mapData = () => {
    if (props.workpiece.documentation) {
      Object.entries(setters).forEach(([field, setter]) => {
        setter(props.workpiece.documentation[field]);
      });
    }
  };

  useEffect(() => {
    mapData();
  }, [props.workpiece]);
  const saveDocumentation = async () => {
    const payload = {
      creation,
      performance,
      recording,
      release,
      files,
      info,
      lyrics,
      streaming,
      workpiece_id,
    };
    console.log('TO PATCH', payload);
    const result = await patchDocumentation(payload);
    console.log('PATCH DOCUMENTATION RESULT', result);
  };

  const onQuitAction = async () => {
    await saveDocumentation();
    history.push(`/workpiece/${workpiece_id}`);
  };

  const commonProps = {
    ...props,
    creation,
    performance,
    recording,
    release,
    files,
    info,
    lyrics,
    streaming,
    setField,
    translations,
    saveDocumentation,
    language,
    workpiece_id,
    onQuitAction,
  };

  return (
    <div className="corridorLayout">
      <TopBar
        {...commonProps}
        crumb1="Documenter mon oeuvre"
        crumb2="DEV"
        onQuitAction={onQuitAction}
      />
      <Switch>
        <Route path="/workpiece/:workpiece_id/documentation/creation">
          <Creation {...commonProps} />
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/performance">
          <Performance {...commonProps} />
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/recording">
          <Recording {...commonProps} />
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/release">
          <Release {...commonProps} />
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/files">
          <Files {...commonProps} />
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/info">
          <Info {...commonProps} />
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/lyrics">
          <Lyrics {...commonProps} />
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/streaming">
          <Streaming {...commonProps} />
        </Route>
      </Switch>
      <Route path="/workpiece/:workpiece_id/documentation/" exact>
        <Creation {...commonProps} />
      </Route>
    </div>
  );
};

export default Documentation;
