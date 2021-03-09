import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
import ArrowLeft from '../../../icons/arrowLeft';
import contractData from './contractData';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: '24 32',
    fontFamily: 'Helvetica',
  },
  h1: {
    display: 'block',
    margin: '0',
    fontSize: '32',
    color: '#2da84f',
    fontFamily: 'Helvetica-Bold',
    // fontWeight: 'bold',
  },
  h2: {
    fontSize: '20',
    fontFamily: 'Helvetica-Bold',
    margin: '0',
    // fontWeight: 'bold',
  },
  p: {
    display: 'block',
    margin: '12 0',
    fontSize: '16',
  },
  italic: {
    fontFamily: 'Helvetica-Oblique',
    // fontStyle: 'italic',
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
    // fontWeight: 'bold',
  },
  boldItalic: {
    // fontStyle: 'italic',
    // fontWeight: 'bold',
  },
  strong: {
    fontFamily: 'Helvetica-Bold',
    color: '#2da84f',
  },
  section: {
    paddingBottom: 24,
  },
  header: {
    // flexGrow: 1,
    paddingBottom: 24,
    marginBottom: 16,
    borderBottom: '1 solid black',
  },
});

const inheritedStyles = [];
const generatePdfContent = (reactElements) => {
  return (
    <>
      {reactElements.map((el) => {
        switch (el.type) {
          case 'h1':
            inheritedStyles.push('h1');
            return (
              <Text style={styles.h1}>
                {generatePdfContent(el.props.children)}
              </Text>
            );
          case 'h2':
            inheritedStyles.push('h2');
            return (
              <Text style={styles.h2}>
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
          case 'strong':
            inheritedStyles.push('strong');
            return (
              <Text style={styles.strong}>
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
        {generatePdfContent(
          ReactHtmlParser(contractData.sections.generalInformations),
        )}
      </View>
      <View style={styles.section}>
        {generatePdfContent(
          ReactHtmlParser(contractData.sections.rightHolders.title),
        )}
      </View>
    </Page>
  </Document>
);

export default function Testing(props) {
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
