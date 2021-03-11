import { Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
// eslint-disable-next-line import/no-cycle
import PDFContentParser from '../PDFContentParser';
import styles from '../styles';

export default function List({
  type = 'alphabetical',
  nestedIndex = '',
  start = 0,
  children,
  debug,
}) {
  const letterIndexes = ['a', 'b', 'c', 'd'];
  let currentIndex = start;

  const filterNestedLists = (element) =>
    element.props.children.findIndex(
      (child) => child.type === 'nol' || child.type === 'aol',
    );
  const filterOtherChildren = (element) => {
    element.props.children.findIndex(
      (child) => child.type !== 'nol' && child.type !== 'aol',
    );
  };

  const Bullet = ({ currentIndex }) => {
    return (
      <Text style={styles.bullet}>
        {type === 'alphabetical' &&
          `${nestedIndex}${letterIndexes[currentIndex - 1]})`}
        {type === 'numeral' && `${nestedIndex}${currentIndex}.`}
      </Text>
    );
  };
  return (
    <View debug={debug} key={Math.random()}>
      {children &&
        children.map((child) => {
          currentIndex++;

          return (
            <View style={styles.li} key={Math.random()}>
              <Bullet currentIndex={currentIndex} />
              <View style={styles.liContent}>
                {child.props &&
                  child.props.children.map((grandChild) => {
                    if (
                      grandChild.type === 'aol' ||
                      grandChild.type === 'nol'
                    ) {
                      return (
                        <List
                          key={Math.random()}
                          type={
                            grandChild.type === 'aol'
                              ? 'alphabetical'
                              : 'numeral'
                          }
                          nestedIndex={`${currentIndex}.`}
                        >
                          {grandChild.props.children}
                        </List>
                      );
                    }

                    return PDFContentParser(
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
