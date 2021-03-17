import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
import styles from '../styles';
import SmartSplit from '../assets/smartsplit.png';
import PDFContentParser from '../PDFContentParser';
import contractData from '../assets/contractData';
import SplitChart from '../splitChart/splitChart';

export default function Contract(props) {
  return (
    <Document>
      {/* <svg width="384" height="384" viewBox="0 0 384 384" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M192,192 L192,0 A192,192 0 1,1 191.99999999999994,384 z" fill="#55F2BA" stroke="white" stroke-width="1"></path><path d="M192,192 L191.99999999999994,384 A192,192 0 1,1 192.0000000000001,0 z" fill="#F2BE3D" stroke="white" stroke-width="1"></path><circle cx="192" cy="192" r="96" fill="#FFFFFF"></circle><g scale="1" transform="translate(128 128)"><svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.9993 64C15.9993 37.4904 37.4896 16 63.9993 16C90.509 16 111.999 37.4904 111.999 64C111.999 90.5097 90.509 112 63.9993 112C37.4896 112 15.9993 90.5097 15.9993 64ZM63.9993 5.33337C31.5986 5.33337 5.33264 31.5993 5.33264 64C5.33264 96.4007 31.5986 122.667 63.9993 122.667C96.4 122.667 122.666 96.4007 122.666 64C122.666 31.5993 96.4 5.33337 63.9993 5.33337ZM51.7705 76.2285C45.0167 69.4747 45.0167 58.5246 51.7705 51.7708C58.5243 45.017 69.4743 45.017 76.2281 51.7708C78.3109 53.8536 81.6878 53.8536 83.7706 51.7708C85.8534 49.688 85.8534 46.3112 83.7706 44.2284C72.8512 33.309 55.1474 33.309 44.228 44.2284C33.3086 55.1478 33.3086 72.8516 44.228 83.771C55.1474 94.6903 72.8512 94.6903 83.7706 83.771C85.8534 81.6882 85.8534 78.3113 83.7706 76.2285C81.6878 74.1457 78.3109 74.1457 76.2281 76.2285C69.4743 82.9823 58.5243 82.9823 51.7705 76.2285Z" fill="#DCDFE1" scale="1"></path></svg></g></g></svg>*/}
      <Page size="A4" style={styles.page} key={Math.random()}>
        <View style={styles.header} key={Math.random()}>
          <Image src={SmartSplit} style={{ width: '38%', marginBottom: 8 }} />
          {PDFContentParser(ReactHtmlParser(contractData.header))}
        </View>
        <SplitChart />
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
