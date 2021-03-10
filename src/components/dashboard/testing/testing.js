import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
import styles from './_/styles';
import PdfContentParser from './_/pdfContentParser';
import ArrowLeft from '../../../icons/arrowLeft';
import contractData from './contractData';
// Create styles

// Create Document Component
const MyDocument = () => (
  <Document>
    {/*<Page size="A4" style={styles.page}>
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
              styles.row,
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
    </Page>*/}
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {PdfContentParser(
          ReactHtmlParser(contractData.sections.recommendations),
        )}
      </View>
      <View style={styles.section}>
        {PdfContentParser(ReactHtmlParser(contractData.sections.moralRights))}
      </View>
      <View style={styles.section}>
        {PdfContentParser(
          ReactHtmlParser(contractData.sections.otherConditions),
        )}
      </View>
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
