import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
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

const CHARTSIZE = 128;

export default function Contract() {
  const {
    copyright,
    copyrightDividingMethod,
    performance,
    recording,
  } = contractData.sections.rightSplit;
  let activeCollaborators = [...copyright, ...performance, ...recording];
  activeCollaborators = activeCollaborators.reduce((acc, el) => {
    if (acc.find((EL) => EL.rightHolder_id === el.rightHolder_id)) {
      return acc;
    }
    return [...acc, el];
  }, []);
  const activeCollaboratorsIds = activeCollaborators.map(
    (el) => el.rightHolder_id,
  );

  const copyrightChartProps = {
    chartData: rightHoldersToChartData(copyright, activeCollaboratorsIds),
    leftChartData: rightHoldersToChartData(
      copyright.filter(
        (rh) => rh.roles.includes('author') || rh.roles.includes('adapter'),
      ),
      activeCollaboratorsIds,
    ),
    rightChartData: rightHoldersToChartData(
      copyright.filter(
        (rh) => rh.roles.includes('composer') || rh.roles.includes('mixer'),
      ),
      activeCollaboratorsIds,
    ),
    logoPath: logoPaths.copyright,
    size: CHARTSIZE,
    key: 'copyrightChart',
  };
  const performanceChartProps = {
    chartData: rightHoldersToChartData(performance, activeCollaboratorsIds),
    logoPath: logoPaths.performance,
    size: CHARTSIZE,
    key: 'performanceChart',
  };
  const recordingChartProps = {
    chartData: rightHoldersToChartData(recording, activeCollaboratorsIds),
    logoPath: logoPaths.recording,
    size: CHARTSIZE,
    key: 'recordingChart',
  };

  return (
    <Document>
      <Page size="A4" style={styles.page} key={Math.random()}>
        <View style={styles.header} key={Math.random()}>
          <Image src={SmartSplit} style={{ width: '38%', marginBottom: 8 }} />
          {PDFContentParser(ReactHtmlParser(contractData.header))}
        </View>
        {copyrightDividingMethod === 'role' && (
          <DualSplitChart {...copyrightChartProps} />
        )}
        {copyrightDividingMethod !== 'role' && (
          <SplitChart {...copyrightChartProps} />
        )}

        <SplitChart {...performanceChartProps} />
        <SplitChart {...recordingChartProps} />

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
      {/* <Page size="A4" style={styles.page} key={Math.random()}>
        <View style={styles.section} key={Math.random()}>
          {PDFContentParser(
            ReactHtmlParser(
              contractData.sections.agreementConditions.description,
            ),
          )}
          <View key={Math.random()}>
            {PDFContentParser(
              ReactHtmlParser(
                contractData.sections.agreementConditions.copyright.title,
              ),
            )}
          </View>
          <List type="numeral" key={Math.random()}>
            {ReactHtmlParser(
              contractData.sections.agreementConditions.copyright.content,
            )}
          </List>
          <View key={Math.random()}>
            {PDFContentParser(
              ReactHtmlParser(
                contractData.sections.agreementConditions.performance.title,
              ),
            )}
          </View>
          <List type="numeral" start={1} key={Math.random()}>
            {ReactHtmlParser(
              contractData.sections.agreementConditions.performance.content,
            )}
          </List>
          <View key={Math.random()}>
            {PDFContentParser(
              ReactHtmlParser(
                contractData.sections.agreementConditions.recording.title,
              ),
            )}
          </View>
          <List type="numeral" start={2} key={Math.random()}>
            {ReactHtmlParser(
              contractData.sections.agreementConditions.recording.content,
            )}
          </List>
        </View>
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
      <Page size="A4" style={styles.page} key={Math.random()}>
        <View style={styles.section} key="recommendations">
          {PDFContentParser(
            ReactHtmlParser(contractData.sections.recommendations),
          )}
        </View>
        <View style={styles.section} key="moralRights">
          {PDFContentParser(ReactHtmlParser(contractData.sections.moralRights))}
        </View>
        <View style={styles.section} key="otherConditions">
          {PDFContentParser(
            ReactHtmlParser(contractData.sections.otherConditions),
          )}
        </View>
        <View style={styles.section} key="signatures">
          {PDFContentParser(
            ReactHtmlParser(contractData.sections.signatures.text),
          )}
          <View style={styles.row} key={Math.random()}>
            {contractData.sections.signatures.signatories.map((signatory) => {
              return (
                <View style={styles.signatoryContainer} key={Math.random()}>
                  <View style={styles.signatureBox} />
                  {PDFContentParser([signatory])}
                </View>
              );
            })}
          </View>
        </View>
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
      </Page>*/}
    </Document>
  );
}
