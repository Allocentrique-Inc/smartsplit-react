import { Text, View } from '@react-pdf/renderer';
import { rightHoldersToChartData } from '../../../../../_/charts/utils';
import logoPaths from '../../assets/logoPaths';
import styles from '../../styles';
import SplitChart from '../../splitChart/splitChart';

export default function PerformanceSplit(props) {
  const { performance, activeCollaboratorsIds, CHARTSIZE } = props;
  const performanceChartProps = {
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
      <View style={styles.rightHolderColumn}>
        <Text>Some text</Text>
      </View>
      <SplitChart {...performanceChartProps} />
    </View>
  );
}
