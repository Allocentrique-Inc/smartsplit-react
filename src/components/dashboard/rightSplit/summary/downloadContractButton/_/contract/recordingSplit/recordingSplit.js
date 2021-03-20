import { Text, View } from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
import { rightHoldersToChartData } from '../../../../../_/charts/utils';
import logoPaths from '../../assets/logoPaths';
import styles from '../../styles';
import SplitChart from '../../splitChart/splitChart';
import contractData from '../../assets/contractData';
import Icon from '../../icon/icon';
import PDFContentParser from '../../PDFContentParser';
import colors from '../../../../../_/colors';
import printRoles from '../_/printRoles';

export default function RecordingSplit(props) {
  const { recording, activeCollaboratorsIds, CHARTSIZE } = props;

  const recordingChartProps = {
    chartData: rightHoldersToChartData(
      recording.rightHolders,
      activeCollaboratorsIds,
    ),
    logoPath: logoPaths.recording,
    size: CHARTSIZE,
    key: 'recordingChart',
  };
  return (
    <View style={styles.rightSplit} key="recording">
      <View style={styles.collaboratorColumn}>
        <View style={styles.splitTitleRow}>
          <Icon path={logoPaths.recording} size={12} style={styles.iconTitle} />
          <Text style={styles.h3}>
            {PDFContentParser(ReactHtmlParser(recording.title))}
          </Text>
        </View>
        {contractData.sections.rightSplit.recording.rightHolders.map(
          (rightHolder, index) => (
            <View style={styles.row}>
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
              <View style={styles.userInitials}>
                <Text>{`${rightHolder.firstName[0]}${rightHolder.lastName[0]}`}</Text>
              </View>
              <View
                style={[
                  styles.collaboratorRow,
                  index ===
                    contractData.sections.rightSplit.recording.rightHolders
                      .length -
                      1 && styles.noBorder,
                ]}
              >
                <View>
                  <Text style={styles.collaboratorName}>
                    {`${rightHolder.firstName} ${rightHolder.lastName}${
                      rightHolder.artistName
                        ? ` (${rightHolder.artistName})`
                        : ''
                    }`}
                  </Text>
                  <Text style={styles.collaboratorRoles}>
                    {rightHolder.displayFunction}
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
                    {rightHolder.displayVote}
                  </Text>
                </View>
              </View>
            </View>
          ),
        )}
      </View>
      <SplitChart {...recordingChartProps} />
    </View>
  );
}
