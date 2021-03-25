import { useParams } from 'react-router-dom';
import { useState } from 'react';
import TopBar from '../_/topBar/topBar';
import DownBar from '../_/downBar/downBar';
import Presentation from '../_/presentation/presentation';
import SelectCollaborators from '../_/selectCollaborators/selectCollaborators';
import CreateNewCollaborator from '../_/createNewCollaborator/createNewCollaborator';

const EditorName = (props) => {
  const { workpiece_id } = useParams();
  const [triedSubmit, setTriedSubmit] = useState(false);
  const t_title = { fr: 'Droit d’auteur', en: 'Copyrights' }[props.language];
  const t_presentation = {
    fr: 'Quel est le nom de ton éditeur?',
    en: '',
  }[props.language];
  const t_description = {
    fr:
      'L’éditeur musical est le représentant des oeuvres d’un créateur. Il aide le créateur à valoriser, exploiter et monnayer ses oeuvres. Tu peux lire cet article pour en apprendre plus sur son rôle.',
    en: '',
  }[props.language];

  const [isCreatingNewCollaborator, setIsCreatingNewCollaborator] = useState(
    false,
  );

  const addCollaborators = (newCollaborator) => {
    console.log(newCollaborator);
    props.setEditor({
      rightHolder: newCollaborator,
      shares: 0,
    });
  };

  console.log(props.editor);
  const commonProps = {
    ...props,
    triedSubmit,
    setTriedSubmit,
    t_title,
    t_presentation,
    t_description,
    addCollaborators,
    isCreatingNewCollaborator,
    setIsCreatingNewCollaborator,
  };
  return (
    <>
      {isCreatingNewCollaborator && <CreateNewCollaborator {...commonProps} />}
      <div className="rightSplitCreation">
        <TopBar {...commonProps} view="editorName" errors={[]} />
        <div className="b1">
          <div className="b1b1">
            <div className="b1b1b1">
              <Presentation {...commonProps} view="copyright" />

              <SelectCollaborators
                {...commonProps}
                preSelectedCollaborators={props.copyright}
                value={
                  props.editor.rightHolder && props.editor.rightHolder.user_id
                    ? props.editor.rightHolder
                    : null
                }
              />

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
          frontUrl={`/workpiece/${workpiece_id}/right-split/editor-shares`}
        />
      </div>
    </>
  );
};

export default EditorName;
