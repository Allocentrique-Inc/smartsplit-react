import { Text, View } from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
import Icon from '../_/icon/icon';
import Badge from '../_/badge/badge';
import { rightHoldersToChartData } from '../../../../../_/charts/utils';
import PDFContentParser from '../_/PDFContentParser';

import logoPaths from '../../assets/logoPaths';
import styles from '../_/styles';
import DualSplitChart from '../_/dualSplitChart/dualSplitChart';
import SplitChart from '../_/splitChart/splitChart';
import colors from '../../../../../_/colors';
import printRoles from '../_/printRoles';
import translations from '../../assets/translations';
import {
  computeLyricChartData,
  computeMusicChartData,
  showDualPieChart,
} from '../../../../../copyright/_/utils';

export default function CopyrightSplit(props) {
  const {
    copyright,
    copyrightDividingMethod,
    activeCollaboratorIds,
    CHARTSIZE,
    language,
  } = props;

  const chartProps = {
    chartData: rightHoldersToChartData(
      copyright.rightHolders,
      activeCollaboratorIds,
    ),
    leftChartData: computeLyricChartData(
      copyright.rightHolders,
      activeCollaboratorIds,
    ),
    leftTitle: translations._lyrics[language],
    rightTitle: translations._music[language],
    rightChartData: computeMusicChartData(
      copyright.rightHolders,
      activeCollaboratorIds,
    ),
    logoPath: logoPaths.copyright,
    size: CHARTSIZE,
    key: 'copyrightChart',
  };

  const shouldDisplayDualPieChart = showDualPieChart(
    copyright.rightHolders,
    copyrightDividingMethod,
  );

  return (
    <View style={styles.rightSplit} key="copyright">
      <View style={styles.collaboratorColumn}>
        <View style={styles.splitTitleRow}>
          <Icon path={logoPaths.copyright} size={12} style={styles.iconTitle} />
          <Text style={styles.h3}>
            {PDFContentParser(ReactHtmlParser(copyright.title))}
          </Text>
        </View>
        {copyright.rightHolders.map((rightHolder, index) => (
          <View style={styles.row} key={rightHolder.rightHolder_id}>
            <View style={styles.userInitials}>
              <Badge
                color={
                  colors[
                    activeCollaboratorIds.indexOf(rightHolder.rightHolder_id)
                  ]
                }
                initials={`${rightHolder.firstName[0]}${rightHolder.lastName[0]}`}
                size={22}
              />
            </View>
            <View
              style={[
                styles.collaboratorRow,
                index === copyright.rightHolders.length - 1 && styles.noBorder,
              ]}
            >
              <View>
                <Text style={styles.collaboratorName}>
                  {`${rightHolder.firstName} ${rightHolder.lastName}${
                    rightHolder.artistName ? ` (${rightHolder.artistName})` : ''
                  }`}
                </Text>
                <Text style={styles.collaboratorRoles}>
                  {printRoles(rightHolder.roles, language)}
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
      {shouldDisplayDualPieChart && <DualSplitChart {...chartProps} />}
      {!shouldDisplayDualPieChart && <SplitChart {...chartProps} />}
    </View>
  );
}
