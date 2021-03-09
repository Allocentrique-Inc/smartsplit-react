import { useEffect } from 'react';
import {
  Document,
  Page,
  Text,
  Link,
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
    padding: '16 32',
    fontFamily: 'Helvetica',
  },
  h1: {
    display: 'block',
    margin: '0',
    fontSize: '24',
    color: '#2da84f',
    // fontWeight: 'bold',
  },
  h2: {
    fontSize: '14',
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.15,
    marginBottom: 10,
    // fontWeight: 'bold',
  },
  p: {
    display: 'block',
    margin: '6 0',
    fontSize: '11',
    lineHeight: '1.15',
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
    color: '#2da84f',
    fontFamily: 'Helvetica-Bold',
  },
  rank: {
    fontSize: 54,
    color: '#2da84f',
    marginRight: 16,
    fontFamily: 'Helvetica-Oblique',
  },
  link: {
    color: '#000000',
  },
  section: {
    paddingBottom: 16,
  },
  row: {
    padding: '8 16',
    flexDirection: 'row',
    borderTop: '1 solid #e2e2e3',
    borderRight: '1 solid #e2e2e3',
    borderLeft: '1 solid #e2e2e3',
    alignItems: 'center',
  },
  lastRow: {
    padding: '0 5.4',
    borderBottom: '1 solid #e2e2e3',
  },
  header: {
    // flexGrow: 1,
    paddingBottom: 24,
    marginBottom: 16,
    borderBottom: '1 solid #9a9a9a',
  },
});

const generatePdfContent = (reactElements) => {
  return (
    <>
      {reactElements.map((el) => {
        switch (el.type) {
          case 'h1':
            return (
              <Text style={styles.h1}>
                {generatePdfContent(el.props.children)}
              </Text>
            );
          case 'h2':
            return (
              <Text style={styles.h2}>
                {generatePdfContent(el.props.children)}
              </Text>
            );

          case 'p':
            return (
              <Text style={styles.p}>
                {generatePdfContent(el.props.children)}
              </Text>
            );
          case 'i':
            return (
              <Text style={styles.italic}>
                {generatePdfContent(el.props.children)}
              </Text>
            );
          case 'b':
            return (
              <Text style={styles.bold}>
                {generatePdfContent(el.props.children)}
              </Text>
            );
          case 'strong':
            return (
              <Text style={styles.strong}>
                {generatePdfContent(el.props.children)}
              </Text>
            );
          case 'rank':
            return (
              <Text style={styles.rank}>
                {generatePdfContent(el.props.children)}
              </Text>
            );
          case 'column':
            return <View>{generatePdfContent(el.props.children)}</View>;
          case 'a':
            return (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <Link style={styles.link} src={el.props.href}>
                {el.props.children}
              </Link>
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
        {contractData.sections.rightHolders.list.map((rightHolder, index) => (
          <View
            style={[
              styles.row,
              index === contractData.sections.rightHolders.list.length - 1
                ? styles.lastRow
                : null,
            ]}
          >
            {generatePdfContent(ReactHtmlParser(rightHolder))}
          </View>
        ))}
      </View>
    </Page>
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
        {contractData.sections.rightHolders.list.map((rightHolder, index) => (
          <View
            style={[
              styles.row,
              index === contractData.sections.rightHolders.list.length - 1
                ? styles.lastRow
                : null,
            ]}
          >
            {generatePdfContent(ReactHtmlParser(rightHolder))}
          </View>
        ))}
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
