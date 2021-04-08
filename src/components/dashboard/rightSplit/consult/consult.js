import { useParams, useHistory, useRouteMatch } from 'react-router-dom';
import MobileTopBar from '../../_/mobileTopBar/mobileTopBar';
import Copyright from './copyright/copyright';
import Performance from './performance/performance';
import Recording from './recording/recording';
import Privacy from './privacy/privacy';
import SplitChart from '../_/charts/splitChart/splitChart';
import DualSplitChart from '../_/charts/dualSplitChart/dualSplitChart';
import Circle from '../_/circle/circle';
import CircledC from '../../../../icons/circledC';
import CircledStar from '../../../../icons/circledStar';
import CircledP from '../../../../icons/circledP';
import {
  computeLyricChartData,
  computeMusicChartData,
  rightHoldersToChartData,
  displayDualPieChart,
} from '../_/charts/utils';

const Consult = (props) => {
  if (!props.workpiece || !props.workpiece.rightSplit || !props.collaborators) {
    return null;
  }

  const history = useHistory();
  const { workpiece_id } = useParams();
  const match = useRouteMatch({
    path: `/workpiece/${workpiece_id}/right-split/consult`,
    strict: true,
  });
  if (!props.isMobile && match && match.isExact) {
    history.push(`/workpiece/${workpiece_id}/right-split/summary`);
  }
  const recording = [...props.recording];
  if (props.label && props.label.rightHolder_id) {
    recording.push(props.label);

  }
  let activeCollaborators = [
    ...props.copyright,
    ...props.performance,
    ...recording,
  ];

  activeCollaborators = activeCollaborators.reduce((acc, el) => {
    if (acc.find((EL) => EL.rightHolder_id === el.rightHolder_id)) {
      return acc;
    }
    return [...acc, el];
  }, []);
  const activeCollaboratorsIds = activeCollaborators.map(
    (el) => el.rightHolder_id,
  );

  const t_copyright = {
    fr: "Droits d'auteur",
    en: 'Copyright',
  }[props.language];
  const t_performance = {
    fr: 'Interprétation',
    en: 'Interpretation',
  }[props.language];
  const t_recording = {
    fr: 'Enregistrement sonore',
    en: 'Recording',
  }[props.language];
  const t_privacy = {
    fr: 'Confidentialité',
    en: 'Privacy',
  }[props.language];
  const t_privacySubtitle = {
    fr: 'veut rendre ce partage des droits',
    en: 'wants to make this split',
  }[props.language];
  const t_sendToCollab = {
    fr: 'Envoyer aux collaborateurs',
    en: 'Send to collaborators',
  }[props.language];
  const t_privacyDescription = {
    fr:
      'encourage la transparence de l’information sur ces partages de droit, afin que toute la communauté puisse bénéficier de bons exemples.',
    en:
      'promote data transparency on theses rights split so all the community can benifit from good examples.',
  }[props.language];
  const t_modify = {
    fr: 'modifier',
    en: 'modify',
  }[props.language];
  const t_public = {
    fr: 'publique',
    en: 'public',
  }[props.language];
  const t_private = {
    fr: 'privé',
    en: 'private',
  }[props.language];
  const t_accepted = {
    fr: 'Accepté',
    en: 'Accepted',
  }[props.language];
  const t_rejected = {
    fr: 'Rejeté',
    en: 'Rejected',
  }[props.language];
  const t_undecided = {
    fr: 'Non décidé',
    en: 'Undecided',
  }[props.language];
  const t_yes = {
    fr: 'Oui',
    en: 'Yes',
  }[props.language];
  const t_no = {
    fr: 'No',
    en: 'Non',
  }[props.language];
  const t_comments = {
    fr: 'Commentaires',
    en: 'Comments',
  }[props.language];
  const t_lyrics = {
    fr: 'Paroles',
    en: 'Lyrics',
  }[props.language];
  const t_music = {
    fr: 'Musique',
    en: 'Music',
  }[props.language];

  const commonProps = {
    ...props,
    t_copyright,
    t_performance,
    t_recording,
    t_privacy,
    t_privacySubtitle,
    t_privacyDescription,
    t_modify,
    t_public,
    t_private,
    t_accepted,
    t_rejected,
    t_undecided,
    t_yes,
    t_no,
    t_comments,
  };
  const copyrightChartProps = {
    chartData: rightHoldersToChartData(props.copyright, activeCollaboratorsIds),
    leftChartData: computeLyricChartData(
      props.copyright,
      activeCollaboratorsIds,
    ),
    leftChartTitle: t_lyrics,
    rightChartTitle: t_music,
    rightChartData: computeMusicChartData(
      props.copyright,
      activeCollaboratorsIds,
    ),
    logo: CircledC,
    size: 300,
  };
  const performanceChartProps = {
    chartData: rightHoldersToChartData(
      props.performance,
      activeCollaboratorsIds,
    ),
    logo: CircledStar,
    size: 300,
  };
  const recordingChartProps = {
    chartData: rightHoldersToChartData(recording, activeCollaboratorsIds),
    logo: CircledP,
    size: 300,
  };
  const shouldDisplayDualPieChart = displayDualPieChart(
    props.copyright,
    props.copyrightDividingMethod,
  );
  return (
    <>
      {!props.isMobile && (
        <>
          {props.copyright.length > 0 && (

            <div className="consultRightSplit">
              <div className="left">
                <Copyright {...commonProps} />
              </div>
              <div className="consultRightSplitRight">
                {!shouldDisplayDualPieChart && (
                  <SplitChart {...copyrightChartProps} />
                )}
                {shouldDisplayDualPieChart && (
                  <DualSplitChart {...copyrightChartProps} />
                )}
              </div>
            </div>
          )}

          {props.performance.length > 0 && (
            <div className="consultRightSplit">
              <div className="left">
                <Performance {...commonProps} />
              </div>
              <div className="consultRightSplitRight">
                <SplitChart {...performanceChartProps} />
              </div>
            </div>
          )}

          {props.recording.length > 0 && (
            <div className="consultRightSplit">
              <div className="left">
                <Recording {...commonProps} />
              </div>
              <div className="consultRightSplitRight">
                <SplitChart {...recordingChartProps} />
              </div>
            </div>
          )}

          <div className="consultRightSplit">
            <div className="left">
              <Privacy {...commonProps} />
            </div>
            <div className="consultRightSplitRight" />
          </div>
        </>
      )}
      {props.isMobile && (
        <div className="mobileConsult">
          <MobileTopBar
            backLink={`/workpiece/${workpiece_id}/right-split/summary`}
            action={<button className="btn-secondary">{t_sendToCollab}</button>}
          >
            {`Version ${props.version}`}
          </MobileTopBar>
          <div className="rightSplits">
            {props.copyright.length > 0 && <Copyright {...commonProps} />}

            {props.performance.length > 0 && <Performance {...commonProps} />}

            {props.recording.length > 0 && <Recording {...commonProps} />}
            {props.privacy.length > 0 && <Privacy {...commonProps} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Consult;
