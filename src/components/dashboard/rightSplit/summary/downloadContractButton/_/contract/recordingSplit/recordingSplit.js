import { Text, View } from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
import { rightHoldersToChartData } from '../../../../../_/charts/utils';
import logoPaths from '../../assets/logoPaths';
import styles from '../_/styles';
import SplitChart from '../_/splitChart/splitChart';
import Icon from '../_/icon/icon';
import Badge from '../_/badge/badge';
import PDFContentParser from '../_/PDFContentParser';
import colors from '../../../../../_/colors';
import printRoles from '../_/printRoles';
import translations from '../../assets/translations';

export default function RecordingSplit(props) {
  const { language, recording, activeCollaboratorsIds, CHARTSIZE } = props;
  const { label } = recording;
  const rightHolders = [...recording.rightHolders];
  if (label && label.rightHolder_id) {
    rightHolders.push(label);
  }
  const chartProps = {
    chartData: rightHoldersToChartData(rightHolders, activeCollaboratorsIds),
    logoPath: logoPaths.recording,
    size: CHARTSIZE,
    key: 'recordingChart',
  };
  const agreementDuration = {
    fr: 'Entente',
    en: 'Agreement',
  }[language];
  return (
    <View style={styles.rightSplit} key="recording">
      <View style={styles.collaboratorColumn}>
        <View style={styles.splitTitleRow}>
          <Icon path={logoPaths.recording} size={12} style={styles.iconTitle} />
          <Text style={styles.h3}>
            {PDFContentParser(ReactHtmlParser(recording.title))}
          </Text>
        </View>
        {rightHolders.map((rightHolder, index) => (
          <View style={styles.row} key={rightHolder.rightHolder_id}>
            <View style={styles.userInitials}>
              <Badge
                color={
                  colors[
                    activeCollaboratorsIds.indexOf(rightHolder.rightHolder_id)
                  ]
                }
                initials={`${rightHolder.firstName[0]}${rightHolder.lastName[0]}`}
                size={22}
              />
            </View>
            <View
              style={[
                styles.collaboratorRow,
                index === recording.rightHolders.length - 1 && styles.noBorder,
              ]}
            >
              <View>
                <Text style={styles.collaboratorName}>
                  {`${rightHolder.firstName} ${rightHolder.lastName}${
                    rightHolder.artistName ? ` (${rightHolder.artistName})` : ''
                  }`}
                </Text>
                <Text style={styles.collaboratorRoles}>
                  {!rightHolder.agreementDuration &&
                    printRoles([rightHolder.function], language)}
                  {rightHolder.agreementDuration &&
                    `Label\n${agreementDuration}: ${
                      translations.agreementDurations[
                        `_${rightHolder.agreementDuration}`
                      ][language]
                    }`}
                </Text>
              </View>
              <View>
                <Text style={styles.collaboratorShares}>
                  {`${rightHolder.shares.toFixed(2)}%`}
                </Text>
                <Text
                  style={
                    rightHolder.vote === 'accepted'
                      ? styles.collaboratorAcceptedVote
                      : styles.collaboratorRefusedVote
                  }
                >
                  {translations.vote[`_${rightHolder.vote}`][language]}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      <SplitChart {...chartProps} />
    </View>
  );
}
