import { useState, useEffect } from 'react';
import { useParams, Route } from 'react-router-dom';
import TopBar from './topBar/topBar';
import translations from '../../../translations';
import Creation from './creation/creation';
import Performance from './performance/performance';
import patchDocumentation from '../../../api/workpieces/patchDocumentation';

const Documentation = (props) => {
  console.log(props);
  const { workpiece_id } = useParams();

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
      console.log('DATA TO MAP', props.workpiece.documentation);
      Object.entries(setters).forEach(([field, setter]) => {
        setter(props.workpiece.documentation[field]);
      });
    }
  };

  useEffect(() => {
    mapData();
  }, [props.workpiece]);

  console.log('FIELDS', { creation });

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
    console.log('PATCH DOCUMENTATION', result);
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
  };

  return (
    <div className="documentation">
      <TopBar {...commonProps} />
      <div className="documentationContent">
        <Route path="/workpiece/:workpiece_id/documentation/creation">
          <Creation {...commonProps} />
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/performance">
          <Performance {...commonProps} />
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/recording">
          <div>recording</div>
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/release">
          <div>release</div>
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/files">
          <div>files</div>
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/info">
          <div>info</div>
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/lyrics">
          <div>lyrics</div>
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/streaming">
          <div>streaming</div>
        </Route>
      </div>
      <Route path="/workpiece/:workpiece_id/documentation/" exact>
        <div>summary</div>
      </Route>
    </div>
  );
};

export default Documentation;
