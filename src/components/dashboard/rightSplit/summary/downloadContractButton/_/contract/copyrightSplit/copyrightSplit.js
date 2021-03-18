import { Text, View } from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
import Icon from '../../icon/icon';
import { rightHoldersToChartData } from '../../../../../_/charts/utils';
import PDFContentParser from '../../PDFContentParser';

import logoPaths from '../../assets/logoPaths';
import styles from '../../styles';
import contractData from '../../assets/contractData';
import DualSplitChart from '../../dualSplitChart/dualSplitChart';
import SplitChart from '../../splitChart/splitChart';
import colors from '../../../../../_/colors';

export default function CopyrightSplit(props) {
  const {
    copyright,
    copyrightDividingMethod,
    activeCollaboratorsIds,
    CHARTSIZE,
  } = props;
  const copyrightChartProps = {
    chartData: rightHoldersToChartData(
      copyright.rightHolders,
      activeCollaboratorsIds,
    ),
    leftChartData: rightHoldersToChartData(
      copyright.rightHolders.filter(
        (rh) => rh.roles.includes('author') || rh.roles.includes('adapter'),
      ),
      activeCollaboratorsIds,
    ),
    rightChartData: rightHoldersToChartData(
      copyright.rightHolders.filter(
        (rh) => rh.roles.includes('composer') || rh.roles.includes('mixer'),
      ),
      activeCollaboratorsIds,
    ),
    logoPath: logoPaths.copyright,
    size: CHARTSIZE,
    key: 'copyrightChart',
  };

  const printRoles = (roles) => {
    let print = '';
    roles.forEach((role, index) => {
      print += `${role}`;
      if (index !== roles.length - 1) {
        print += ', ';
      }
    });
    return print;
  };

  return (
    <View style={styles.rightSplit} key="copyright">
      <View style={styles.collaboratorColumn}>
        <View style={styles.splitTitleRow}>
          <Icon path={logoPaths.copyright} size={12} style={styles.iconTitle} />
          <Text style={styles.h3}>
            {PDFContentParser(ReactHtmlParser(copyright.title))}
          </Text>
        </View>
        {contractData.sections.rightSplit.copyright.rightHolders.map(
          (rightHolder, index) => (
            <View style={styles.row}>
              <View
                style={{
                  backgroundColor:
                    colors[
                      activeCollaboratorsIds.indexOf(rightHolder.rightHolder_id)
                    ],
                  width: 4,
                  margin: '1 0',
                }}
              />
              <View style={styles.userInitials}>
                <Text>{`${rightHolder.firstName[0]}${rightHolder.lastName[0]}`}</Text>
              </View>
              <View
                style={[
                  styles.collaboratorRow,
                  index ===
                    contractData.sections.rightSplit.copyright.rightHolders
                      .length -
                      1 && styles.noBorder,
                ]}
              >
                <View>
                  <Text style={styles.collaboratorName}>
                    {`${rightHolder.firstName} ${rightHolder.lastName}${
                      rightHolder.artistName
                        ? ` (${rightHolder.artistName})`
                        : ''
                    }`}
                  </Text>
                  <Text style={styles.collaboratorRoles}>
                    {printRoles(rightHolder.displayRoles)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.collaboratorShares}>
                    {`${rightHolder.shares.toFixed(2)}%`}
                  </Text>
                  <Text
                    style={
                      rightHolder.vote === 'accepted'
                        ? styles.collaboratorAcceptedVote
                        : styles.collaboratorRefusedVote
                    }
                  >
                    {rightHolder.vote}
                  </Text>
                </View>
              </View>
            </View>
          ),
        )}
      </View>
      {copyrightDividingMethod === 'role' && (
        <DualSplitChart {...copyrightChartProps} />
      )}
      {copyrightDividingMethod !== 'role' && (
        <SplitChart {...copyrightChartProps} />
      )}
    </View>
  );
}
