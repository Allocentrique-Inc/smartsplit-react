import { Text, View } from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
import Icon from '../_/icon/icon';
import { rightHoldersToChartData } from '../../../../../_/charts/utils';
import PDFContentParser from '../_/PDFContentParser';

import logoPaths from '../../assets/logoPaths';
import styles from '../_/styles';
import DualSplitChart from '../_/dualSplitChart/dualSplitChart';
import SplitChart from '../_/splitChart/splitChart';
import colors from '../../../../../_/colors';
import printRoles from '../_/printRoles';
import translations from '../../assets/translations';

export default function CopyrightSplit(props) {
  const {
    copyright,
    copyrightDividingMethod,
    activeCollaboratorsIds,
    CHARTSIZE,
    language,
  } = props;

  const chartProps = {
    chartData: rightHoldersToChartData(
      copyright.rightHolders,
      activeCollaboratorsIds,
    ),
    leftChartData: rightHoldersToChartData(
      copyright.rightHolders.filter(
        (rh) => rh.roles.includes('author') || rh.roles.includes('adapter'),
      ),
      activeCollaboratorsIds,
    ),
    leftTitle: translations._lyrics[language],
    rightTitle: translations._music[language],
    rightChartData: rightHoldersToChartData(
      copyright.rightHolders.filter(
        (rh) => rh.roles.includes('composer') || rh.roles.includes('mixer'),
      ),
      activeCollaboratorsIds,
    ),
    logoPath: logoPaths.copyright,
    size: CHARTSIZE,
    key: 'copyrightChart',
  };

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
            <View
              style={{
                backgroundColor:
                  colors[
                    activeCollaboratorsIds.indexOf(rightHolder.rightHolder_id)
                  ],
                width: 4,
                margin: '1 0',
              }}
            />
            <View style={styles.userInitials} debug>
              <Text>{`${rightHolder.firstName[0]}${rightHolder.lastName[0]}`}</Text>
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
      {copyrightDividingMethod === 'role' && <DualSplitChart {...chartProps} />}
      {copyrightDividingMethod !== 'role' && <SplitChart {...chartProps} />}
    </View>
  );
}
