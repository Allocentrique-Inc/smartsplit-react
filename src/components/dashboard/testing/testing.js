import { Link } from 'react-router-dom';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
import ArrowLeft from '../../../icons/arrowLeft';
import contractData from './contract-pdf-draft';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: '24 32',
  },
  h1: {
    display: 'block',
    marginBottom: '0.67em',
    marginLeft: 0,
    marginRight: 0,
    fontSize: 32,
    color: '#2da84f',
    fontWeight: 500,
    fontStyle: 'normal',
    textDecoration: 'none',
    verticalAlign: 'baseline',
  },
  h2: {
    fontSize: 16,
    fontWeight: 500,
  },
  p: {
    display: 'block',
    marginTop: '1em',
    marginBottom: '1em',
    marginLeft: 0,
    marginRight: 0,
  },
  // fontStyles doesn't work, see https://github.com/diegomura/react-pdf/issues/164
  italic: {
    fontFamily: 'Helvetica-Oblique',
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  boldItalic: {
    fontFamily: 'Times-BoldItalic',
  },
  section: {
    flexGrow: 1,
  },
  header: {
    flexGrow: 1,
  },
});
const inheritedStyles = [];
const generatePdfContent = (reactElements) => {
  return (
    <>
      {reactElements.map((el) => {
        console.log(el);
        switch (el.type) {
          case 'h1':
            inheritedStyles.push('h1');
            return (
              <Text style={styles.h1}>
                {generatePdfContent(el.props.children)}
              </Text>
            );
          case 'p':
            inheritedStyles.push('p');
            return (
              <Text style={styles.p}>
                {generatePdfContent(el.props.children)}
              </Text>
            );
          case 'i':
            inheritedStyles.push('italic');
            return (
              <Text
                style={[
                  styles.italic,
                  inheritedStyles.includes('bold') ? styles.boldItalic : {},
                ]}
              >
                {generatePdfContent(el.props.children)}
              </Text>
            );
          case 'b':
            inheritedStyles.push('bold');
            return (
              <Text
                style={[
                  styles.bold,
                  inheritedStyles.includes('italic') ? styles.boldItalic : {},
                ]}
              >
                {generatePdfContent(el.props.children)}
              </Text>
            );
          default:
            return el;
        }
      })}
    </>
  );
};
// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        {generatePdfContent(ReactHtmlParser(contractData.header))}
      </View>
      <View style={styles.section}>
        <Text>Section #3</Text>
      </View>
    </Page>
  </Document>
);

export default function Testing(props) {
  console.log('DATA', ReactHtmlParser(contractData.header));

  return (
    <div>
      <div className="topBar">
        <Link to="/">
          <ArrowLeft />
        </Link>
      </div>
      Testing Page
      <PDFViewer width={585} height={842}>
        <MyDocument />
      </PDFViewer>
    </div>
  );
}
