import { Text, View } from '@react-pdf/renderer';
import { rightHoldersToChartData } from '../../../../../_/charts/utils';
import logoPaths from '../../assets/logoPaths';
import styles from '../../styles';
import SplitChart from '../../splitChart/splitChart';

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
      <View style={styles.rightHolderColumn}>
        <Text>Some text</Text>
      </View>
      <SplitChart {...recordingChartProps} />
    </View>
  );
}
