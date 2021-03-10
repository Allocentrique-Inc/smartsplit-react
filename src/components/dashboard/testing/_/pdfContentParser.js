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
          case 'aol':
            return <List>{el.props.children}</List>;
          case 'nol':
            return <List type="numeral">{el.props.children}</List>;
          default:
            return <Text>{el}</Text>;
        }
      })}
    </>
  );
}

const List = ({ type = 'alphabetical', children }) => {
  const letterIndexes = ['a', 'b', 'c', 'd'];
  let counter = 0;
  const Bullet = () => (
    <Text style={styles.listIndex}>
      {type === 'alphabetical' && `${letterIndexes[counter++]})`}
      {type === 'numeral' && `${++counter}.`}
    </Text>
  );

  return (
    <View>
      {children &&
        children.map((child) => {
          console.log('CHILD', child);
          return (
            <View style={styles.li}>
              <Bullet />
              <View style={styles.liContent}>
                {PdfContentParser(child.props.children)}
              </View>
            </View>
          );
        })}
    </View>
  );
};
