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
// eslint-disable-next-line import/no-cycle
import List from './list/list';
import styles from './styles';

export default function PdfContentParser(reactElements) {
  console.log('REACT ELEMENTS', reactElements);
  return reactElements.map((el) => {
    switch (el.type) {
      case 'h1':
        return (
          <Text style={styles.h1}>{PdfContentParser(el.props.children)}</Text>
        );
      case 'h2':
        return (
          <Text style={styles.h2}>{PdfContentParser(el.props.children)}</Text>
        );
      case 'h3':
        return (
          <Text style={styles.h3}>{PdfContentParser(el.props.children)}</Text>
        );

      case 'p':
        return (
          <Text style={styles.p}>{PdfContentParser(el.props.children)}</Text>
        );
      case 'i':
        return (
          <Text style={styles.italic}>
            {PdfContentParser(el.props.children)}
          </Text>
        );
      case 'b':
        return (
          <Text style={styles.bold}>{PdfContentParser(el.props.children)}</Text>
        );
      case 'strong':
        return (
          <Text style={styles.strong}>
            {PdfContentParser(el.props.children)}
          </Text>
        );
      case 'rank':
        return (
          <Text style={styles.rank}>{PdfContentParser(el.props.children)}</Text>
        );
      case 'column':
        return <View>{PdfContentParser(el.props.children)}</View>;
      case 'a':
        return (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link style={styles.link} src={el.props.href}>
            {el.props.children}
          </Link>
        );
      case 'aol':
        return <List>{el.props.children}</List>;
      case 'nol':
        return <List type="numeral">{el.props.children}</List>;
      case 'row':
        return (
          <Text style={styles.textRow}>
            {PdfContentParser(el.props.children)}
          </Text>
        );
      default:
        return <Text>{el}</Text>;
    }
  });
}
