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
import ArtistName from '../../../../../../_/artistName/artistName';

export default function PerformanceSplit(props) {
  const { language, performance, activeCollaboratorsIds, CHARTSIZE } = props;
  const chartProps = {
    chartData: rightHoldersToChartData(
      performance.rightHolders,
      activeCollaboratorsIds,
    ),
    logoPath: logoPaths.performance,
    size: CHARTSIZE,
    key: 'performanceChart',
  };

  return (
    <View style={styles.rightSplit} key="performance">
      <View style={styles.collaboratorColumn}>
        <View style={styles.splitTitleRow}>
          <Icon
            path={logoPaths.performance}
            size={12}
            style={styles.iconTitle}
          />
          <Text style={styles.h3}>
            {PDFContentParser(ReactHtmlParser(performance.title))}
          </Text>
        </View>
        {performance.rightHolders.map((rightHolder, index) => (
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
                index === performance.rightHolders.length - 1 &&
                  styles.noBorder,
              ]}
            >
              <View>
                <Text style={styles.collaboratorName}>
                  <ArtistName user={rightHolder} />
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
      <SplitChart {...chartProps} />
    </View>
  );
}
