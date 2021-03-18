import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
import CopyrightSplit from './copyrightSplit/copyrightSplit';
import PerformanceSplit from './performanceSplit/performanceSplit';
import RecordingSplit from './recordingSplit/recordingSplit';

import styles from '../styles';
import SmartSplit from '../assets/smartsplit.png';
import PDFContentParser from '../PDFContentParser';
import contractData from '../assets/contractData';
import SplitChartSVG from '../../../../_/charts/splitChart/splitChart';
import SplitChart from '../splitChart/splitChart';
import DualSplitChart from '../dualSplitChart/dualSplitChart';
import usePieChartSlices from '../../../../_/charts/usePieChartSlices';
import { rightHoldersToChartData } from '../../../../_/charts/utils';
import logoPaths from '../assets/logoPaths';
import copyrightIcon from '../../../../../../../icons/copyright';
import Icon from '../icon/icon';

const CHARTSIZE = 230;
export default function Contract() {
  const {
    copyright,
    copyrightDividingMethod,
    performance,
    recording,
  } = contractData.sections.rightSplit;
  let activeCollaborators = [
    ...copyright.rightHolders,
    ...performance.rightHolders,
    ...recording.rightHolders,
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

  const commonProps = {
    activeCollaboratorsIds,
    CHARTSIZE,
    copyright,
    copyrightDividingMethod,
    performance,
    recording,
  };
  return (
    <Document>
      <Page size="A4" style={styles.page} key={Math.random()}>
        {PDFContentParser(
          ReactHtmlParser(contractData.sections.rightSplit.title),
        )}
        <CopyrightSplit {...commonProps} />
        <PerformanceSplit {...commonProps} />
        <RecordingSplit {...commonProps} />

        <View fixed key={Math.random()} style={styles.footer}>
          <Text
            fixed
            render={({ pageNumber, totalPages }) =>
              `- Page ${pageNumber} / ${totalPages}`
            }
          />
          <Text> </Text>
          {PDFContentParser(ReactHtmlParser(contractData.footer))}
        </View>
      </Page>
    </Document>
  );
}
