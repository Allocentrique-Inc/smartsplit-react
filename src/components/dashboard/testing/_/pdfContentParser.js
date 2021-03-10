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
import styles from './styles';

export default function PdfContentParser(reactElements) {
  return (
    <>
      {reactElements.map((el) => {
        switch (el.type) {
          case 'h1':
            return (
              <Text style={styles.h1}>
                {PdfContentParser(el.props.children)}
              </Text>
            );
          case 'h2':
            return (
              <Text style={styles.h2}>
                {PdfContentParser(el.props.children)}
              </Text>
            );

          case 'p':
            return (
              <Text style={styles.p}>
                {PdfContentParser(el.props.children)}
              </Text>
            );
          case 'i':
            return (
              <Text style={styles.italic}>
                {PdfContentParser(el.props.children)}
              </Text>
            );
          case 'b':
            return (
              <Text style={styles.bold}>
                {PdfContentParser(el.props.children)}
              </Text>
            );
          case 'strong':
            return (
              <Text style={styles.strong}>
                {PdfContentParser(el.props.children)}
              </Text>
            );
          case 'rank':
            return (
              <Text style={styles.rank}>
                {PdfContentParser(el.props.children)}
              </Text>
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
          case 'ol':
            return <List>{el.props.children}</List>;
          default:
            return <Text style={styles.wrap}>{el}</Text>;
        }
      })}
    </>
  );
}

const List = ({ type = 'letter', children }) => {
  const letterIndexes = ['a', 'b', 'c', 'd'];
  let counter = 0;
  return (
    <View>
      {children &&
        children.map((child) => {
          return (
            <View style={styles.li}>
              <View>
                <Text style={styles.listIndex}>
                  {letterIndexes[counter++]})
                </Text>
              </View>
              <View>{PdfContentParser(child.props.children)}</View>
            </View>
          );
        })}
    </View>
  );
};
