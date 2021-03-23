import Copyright from './copyright/copyright';
import Performance from './performance/performance';
import Recording from './recording/recording';
import Privacy from './privacy/privacy';
import SplitChart from '../_/charts/splitChart/splitChart';
import Circle from '../_/circle/circle';
import CircledC from '../../../../icons/circledC';
import {
  computeLyricChartData,
  computeMusicChartData,
  rightHoldersToChartData,
} from '../_/charts/utils';

const Consult = (props) => {
  if (!props.workpiece || !props.workpiece.rightSplit || !props.collaborators) {
    return null;
  }

  const recording = [
    props.rightSplitInConsultation &&
    props.rightSplitInConsultation.label &&
    props.rightSplitInConsultation.label.rightHolder_id
      ? props.rightSplitInConsultation.label
      : '',
    ...props.rightSplitInConsultation.recording,
  ].filter((e) => e !== '');

  let activeCollaborators = [
    ...props.rightSplitInConsultation.copyright,
    ...props.rightSplitInConsultation.performance,
    ...props.rightSplitInConsultation.recording,
  ];
  if (
    props.rightSplitInConsultation &&
    props.rightSplitInConsultation.label &&
    props.rightSplitInConsultation.label.rightHolder_id
  ) {
    activeCollaborators.push(props.rightSplitInConsultation.label);
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
    activeCollaboratorsIds,
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
    chartData: rightHoldersToChartData(
      props.copyright,
      props.activeCollaboratorsIds,
    ),
    leftChartData: computeLyricChartData(
      props.copyright,
      props.activeCollaboratorsIds,
    ),
    leftChartTitle: t_lyrics,
    rightChartTitle: t_music,
    rightChartData: computeMusicChartData(
      props.copyright,
      props.activeCollaboratorsIds,
    ),
    size: 300,
  };
  return (
    <>
      {props.rightSplitInConsultation.copyright.length > 0 && (
        <div className="consultRightSplit">
          <div className="left">
            <Copyright {...commonProps} />
          </div>
          <div className="consultRightSplitRight">
            {props.rightSplitInConsultation.copyright.length > 0 &&
              props.copyrightDividingMethod !== 'role' && (
                <SplitChart {...commonProps} logo={CircledC} />
              )}
          </div>
        </div>
      )}

      {props.rightSplitInConsultation.performance.length > 0 && (
        <div className="consultRightSplit">
          <div className="left">
            <Performance {...commonProps} />
          </div>
          <div className="consultRightSplitRight">
            <Circle
              {...commonProps}
              collaborators={props.rightSplitInConsultation.performance}
              consult
            />
          </div>
        </div>
      )}

      {recording.length > 0 && (
        <div className="consultRightSplit">
          <div className="left">
            <Recording {...commonProps} />
          </div>
          <div className="consultRightSplitRight">
            <Circle {...commonProps} collaborators={recording} consult />
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
  );
};

export default Consult;
