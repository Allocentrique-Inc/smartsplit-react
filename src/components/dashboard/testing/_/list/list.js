import { Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
// eslint-disable-next-line import/no-cycle
import PdfContentParser from '../pdfContentParser';
import styles from '../styles';

export default function List({
  type = 'alphabetical',
  nestedIndex = '',
  children,
  debug,
}) {
  const letterIndexes = ['a', 'b', 'c', 'd'];
  let counter = 0;

  const filterNestedLists = (element) =>
    element.props.children.findIndex(
      (child) => child.type === 'nol' || child.type === 'aol',
    );
  const filterOtherChildren = (element) => {
    element.props.children.findIndex(
      (child) => child.type !== 'nol' && child.type !== 'aol',
    );
  };

  const Bullet = ({ counter }) => {
    return (
      <Text style={styles.bullet}>
        {type === 'alphabetical' &&
          `${nestedIndex}${letterIndexes[counter - 1]})`}
        {type === 'numeral' && `${nestedIndex}${counter}.`}
      </Text>
    );
  };
  console.log('CHILDREN', children);

  return (
    <View debug={debug}>
      {children &&
        children.map((child) => {
          counter++;

          return (
            <View style={styles.li} key={Math.random()}>
              <Bullet counter={counter} />
              <View style={styles.liContent}>
                {child.props &&
                  child.props.children.map((grandChild) => {
                    if (
                      grandChild.type === 'aol' ||
                      grandChild.type === 'nol'
                    ) {
                      return (
                        <List
                          type={
                            grandChild.type === 'aol'
                              ? 'alphabetical'
                              : 'numeral'
                          }
                          nestedIndex={`${counter}.`}
                        >
                          {grandChild.props.children}
                        </List>
                      );
                    }

                    return PdfContentParser(
                      Array.isArray(grandChild) ? grandChild : [grandChild],
                    );
                  })}
              </View>
            </View>
          );
        })}
    </View>
  );
}
