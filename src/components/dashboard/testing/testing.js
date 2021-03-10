import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
import styles from './_/styles';
import PdfContentParser from './_/pdfContentParser';
import ArrowLeft from '../../../icons/arrowLeft';
import contractData from './contractData';
import List from './_/list/list';
// Create styles

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        {PdfContentParser(ReactHtmlParser(contractData.header))}
      </View>
      <View style={styles.section}>
        {PdfContentParser(
          ReactHtmlParser(contractData.sections.generalInformations),
        )}
      </View>
      <View style={styles.section}>
        {PdfContentParser(
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
            {PdfContentParser(ReactHtmlParser(rightHolder))}
          </View>
        ))}
      </View>
      <Text
        fixed
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `${contractData.footer} ${pageNumber} / ${totalPages}`
        }
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {PdfContentParser(
          ReactHtmlParser(
            contractData.sections.agreementConditions.description,
          ),
        )}
        <View>
          {PdfContentParser(
            ReactHtmlParser(
              contractData.sections.agreementConditions.copyright.title,
            ),
          )}
        </View>
        <List type="numeral">
          {ReactHtmlParser(
            contractData.sections.agreementConditions.copyright.content,
          )}
        </List>
        <View>
          {PdfContentParser(
            ReactHtmlParser(
              contractData.sections.agreementConditions.performance.title,
            ),
          )}
        </View>
        <List type="numeral">
          {ReactHtmlParser(
            contractData.sections.agreementConditions.performance.content,
          )}
        </List>
        <View>
          {PdfContentParser(
            ReactHtmlParser(
              contractData.sections.agreementConditions.recording.title,
            ),
          )}
        </View>
        <List type="numeral">
          {ReactHtmlParser(
            contractData.sections.agreementConditions.recording.content,
          )}
        </List>
      </View>
      <Text
        fixed
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `${contractData.footer} ${pageNumber} / ${totalPages}`
        }
      />
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.section} key="recommendations">
        {PdfContentParser(
          ReactHtmlParser(contractData.sections.recommendations),
        )}
      </View>
      <View style={styles.section} key="moralRights">
        {PdfContentParser(ReactHtmlParser(contractData.sections.moralRights))}
      </View>
      <View style={styles.section} key="otherConditions">
        {PdfContentParser(
          ReactHtmlParser(contractData.sections.otherConditions),
        )}
      </View>
      <View style={styles.section} key="signatures">
        {PdfContentParser(
          ReactHtmlParser(contractData.sections.signatures.text),
        )}
        <View style={styles.row}>
          {contractData.sections.signatures.signatories.map((signatory) => {
            return (
              <View style={styles.signatoryContainer}>
                <View style={styles.signatureBox} />
                {PdfContentParser([signatory])}
              </View>
            );
          })}
        </View>
      </View>
      <Text
        fixed
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `${contractData.footer} ${pageNumber} / ${totalPages}`
        }
      />
    </Page>
  </Document>
);

export default function Testing(props) {
  return (
    <div>
      <PDFViewer width={585} height={842}>
        <MyDocument />
      </PDFViewer>
    </div>
  );
}
