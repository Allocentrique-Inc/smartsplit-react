import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TopBar from '../_/topBar/topBar';
import DownBar from '../_/downBar/downBar';
import Presentation from '../_/presentation/presentation';
import Collaborator from './collaborator/collaborator';

const EditorShares = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const [triedSubmit, setTriedSubmit] = useState(false);
  const t_title = { fr: 'Droit d’auteur', en: 'Copyrights' }[props.language];
  console.log(props.workpiece);
  const { workpiece } = props;
  const personalShares = workpiece.rightSplit.copyright.find(
    (el) => el.rightHolder_id === props.user.user_id,
  ).shares;
  const songTitle = props.workpiece.title;
  const t_presentation = {
    fr: 'Combien ton éditeur devrait-il avoir?',
    en: '',
  }[props.language];
  const t_description = {
    fr: `C’est officiel, <b>tu possèdes ${personalShares.toFixed(
      2,
    )}% du droit d’auteur de l’oeuvre ${songTitle}</b>. Tu dois maintenant indiquer combien, de cette part, sera partagé avec ton éditeur.`,
    en: '',
  }[props.language];

  const handleDrag = (params) => {
    props.setEditor({
      ...props.editor,
      shares:
        params.id === 0
          ? params.newShares > 50
            ? 100 - params.newShares
            : 50
          : params.newShares > 50
          ? 50
          : params.newShares,
    });
  };

  const self = {
    rightHolder: props.user,
    shares:
      props.editor &&
      props.editor.rightHolder &&
      props.editor.rightHolder.user_id
        ? 100 - props.editor.shares
        : 0,
  };

  useEffect(() => {
    if (
      !(
        props.editor &&
        props.editor.rightHolder &&
        props.editor.rightHolder.user_id
      )
    ) {
      history.push(`/workpiece/${workpiece_id}/right-split/editor-name`);
    }
  }, [props.editor]);

  const commonProps = {
    ...props,
    triedSubmit,
    setTriedSubmit,
    t_title,
    t_presentation,
    t_description,
    handleDrag,
  };
  return (
    <div className="rightSplitCreation">
      <TopBar {...commonProps} view="editorShares" errors={[]} />
      <div className="b1">
        <div className="b1b1">
          <div className="b1b1b1">
            <Presentation {...commonProps} view="copyright" />

            <Collaborator {...commonProps} collaborator={self} id={0} />
            {props.editor &&
              props.editor.rightHolder &&
              props.editor.rightHolder.user_id && (
                <Collaborator
                  {...commonProps}
                  collaborator={props.editor}
                  showEllipsis
                  limitToHalf
                  id={1}
                />
              )}
            {/* {triedSubmit && <PageErrors {...commonProps} errors={pageErrors} />} */}
          </div>
          {/* <div className="b1b1b2">
            <div className="b1b1b1b2">
              {shouldDisplayPieChart &&
                props.copyrightDividingMethod !== 'role' && (
                  <SplitChart {...commonProps} />
                )}
              {shouldDisplayPieChart &&
                props.copyrightDividingMethod === 'role' && (
                  <DualSplitChart {...commonProps} />
                )}
            </div>
          </div> */}
        </div>
      </div>
      <DownBar
        {...commonProps}
        errors={[]}
        backUrl={`/workpiece/${workpiece_id}/right-split/editor-name`}
        frontUrl={`/workpiece/${workpiece_id}/right-split/summary`}
      />
    </div>
  );
};

export default EditorShares;
