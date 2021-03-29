import { StyleSheet } from '@react-pdf/renderer';

export default StyleSheet.create({
  smartSplitLogo: {
    width: '50%',
  },
  page: {
    padding: '18 30',
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
  h3: {
    fontSize: '11',
    fontFamily: 'Helvetica-Bold',
    color: '#2da84f',

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
  rightHolderRow: {
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
  bullet: {
    paddingRight: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  signatoryContainer: {
    width: '50%',
    fontSize: 11,
    fontFamily: 'Times-Bold',
  },
  signatureBox: {
    height: 50,
    borderBottom: '2 dashed #203548',
    marginRight: 32,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 32,
    fontSize: 8,
    flexDirection: 'row-reverse',
  },
  rightSplit: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 12,
    justifyContent: 'space-between',
  },
  collaboratorColumn: {
    width: '50%',
  },
  collaboratorRow: {
    flex: 1,
    padding: '12 0 9 0',
    marginLeft: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1 solid #e2e2e3',
  },
  rightSplitTitle: {
    flexDirection: 'row',
  },
  iconTitle: {
    marginRight: 8,
  },
  collaboratorRoles: {
    fontSize: 7,
    color: '#687A8B',
    marginTop: 3,
  },
  collaboratorName: {
    fontSize: 9,
    color: '#203548',
  },
  collaboratorShares: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#516b81',
  },
  collaboratorAcceptedVote: {
    marginTop: 3,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#2da84f',
  },
  collaboratorRefusedVote: {
    marginTop: 3,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#AC1616',
  },
  userInitials: {
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  noBorder: {
    border: 0,
  },
  splitTitleRow: {
    flexDirection: 'row',
    margin: '12 0 12 8',
  },
});
