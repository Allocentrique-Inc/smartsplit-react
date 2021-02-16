import { useParams, useHistory } from 'react-router-dom';
import SongPlaceholder from '../../../../icons/songPlaceholder';
import ChevronRight from '../../../../icons/chevron-right';

export default function TopBar(props) {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const title = props.workpiece.title || '';
  const breadCrumb1 =
    props.translations.documentation.topBar.breadCrumb._documentation[
      props.language
    ];
  const breadCrumb2 = 'DEV';
  // const breadCrumb2 =
  //   props.translations.documentation.topBar.breadCrumb[`_${props.view}`][
  //     props.language
  //   ];
  return (
    <div className="topBar">
      <div className="left">
        <SongPlaceholder />
        <div className="workpieceTitle">{title}</div>
        <div className="breadCrumbs >">
          <div className="crumb">{breadCrumb1}</div>
          <ChevronRight />
          <div className="p2">{breadCrumb2}</div>
        </div>
      </div>
      <div className="right">
        <button className="btn-secondary" onClick={props.saveDocumentation}>
          Sauvegarder et fermer
        </button>
      </div>
    </div>
  );
}
