import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
import CopyrightSplit from './copyrightSplit/copyrightSplit';
import PerformanceSplit from './performanceSplit/performanceSplit';
import RecordingSplit from './recordingSplit/recordingSplit';

import styles from './_/styles';
import SmartSplit from '../assets/smartsplit.png';
import PDFContentParser from './_/PDFContentParser';
import mockData from '../assets/mockData';
import SplitChart from './_/splitChart/splitChart';
import DualSplitChart from './_/dualSplitChart/dualSplitChart';
import { rightHoldersToChartData } from '../../../../_/charts/utils';
import logoPaths from '../assets/logoPaths';
import copyrightIcon from '../../../../../../../icons/copyright';
import Icon from './_/icon/icon';
import List from './_/list/list';

const CHARTSIZE = 230;
export default function Contract({ contractData = mockData }) {
  const {
    copyright,
    copyrightDividingMethod,
    performance,
    recording,
  } = contractData.sections.rightSplit;
  const { locale } = contractData;
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
    language: locale,
  };
  return (
    <Document>
      <Page size="A4" style={styles.page} key="generalInformations">
        <Image src={SmartSplit} style={styles.smartSplitLogo} />
        <View style={styles.header} key={Math.random()}>
          {PDFContentParser(ReactHtmlParser(contractData.header))}
        </View>
        <View style={styles.section} key={Math.random()}>
          {PDFContentParser(
            ReactHtmlParser(contractData.sections.generalInformations),
          )}
        </View>
        <View style={styles.section} key={Math.random()}>
          {PDFContentParser(
            ReactHtmlParser(contractData.sections.rightHolders.title),
          )}
          {contractData.sections.rightHolders.list.map((rightHolder, index) => (
            <View
              style={[
                styles.rightHolderRow,
                index === contractData.sections.rightHolders.list.length - 1
                  ? styles.lastRow
                  : null,
              ]}
              key={Math.random()}
            >
              {PDFContentParser(ReactHtmlParser(rightHolder))}
            </View>
          ))}
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
      <Page size="A4" style={styles.page} key="rightSplits">
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
      <Page size="A4" style={styles.page} key="agreementConditions">
        <View style={styles.section} key={Math.random()}>
          {PDFContentParser(
            ReactHtmlParser(
              contractData.sections.agreementConditions.description,
            ),
          )}
          <View style={styles.splitTitleRow} key="copyrightTitle">
            <Icon
              path={logoPaths.copyright}
              size={12}
              style={styles.iconTitle}
            />
            <Text style={styles.h3}>
              {PDFContentParser(
                ReactHtmlParser(
                  contractData.sections.agreementConditions.copyright.title,
                ),
              )}
            </Text>
          </View>

          <List type="numeral" key={Math.random()}>
            {ReactHtmlParser(
              contractData.sections.agreementConditions.copyright.content,
            )}
          </List>
          <View style={styles.splitTitleRow} key="performanceTitle">
            <Icon
              path={logoPaths.performance}
              size={12}
              style={styles.iconTitle}
            />
            <Text style={styles.h3}>
              {PDFContentParser(
                ReactHtmlParser(
                  contractData.sections.agreementConditions.performance.title,
                ),
              )}
            </Text>
          </View>

          <List type="numeral" start={1} key={Math.random()}>
            {ReactHtmlParser(
              contractData.sections.agreementConditions.performance.content,
            )}
          </List>
          <View style={styles.splitTitleRow} key="recordingTitle">
            <Icon
              path={logoPaths.recording}
              size={12}
              style={styles.iconTitle}
            />
            <Text style={styles.h3}>
              {PDFContentParser(
                ReactHtmlParser(
                  contractData.sections.agreementConditions.recording.title,
                ),
              )}
            </Text>
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
      <Page size="A4" style={styles.page} key="other">
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
      </Page>
    </Document>
  );
}
