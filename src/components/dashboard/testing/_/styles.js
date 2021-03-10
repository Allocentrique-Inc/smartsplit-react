import { StyleSheet } from '@react-pdf/renderer';

export default StyleSheet.create({
  page: {
    padding: '16 32',
    fontFamily: 'Helvetica',
    flex: 1,
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
    marginBottom: 8,
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
  li: {
    fontSize: 11,
    flexDirection: 'row',
    padding: 5,
  },
  liContent: {
    flexDirection: 'column',
    flex: 1,
  },
  listIndex: {
    paddingRight: 12,
  },
});
