import { Document, Page, Text, View, BlobProvider } from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
import styles from './_/styles';
import List from './_/list/list';
import PDFContentParser from './_/PDFContentParser';
import contractData from './contractData';

export default function DownloadContractButton({ language }) {
  // const t_filename = {
  //   fr: '(TEST)Entente de partage de droit.pdf',
  //   en: '(TEST)Right split agreee.pdf',
  // }[language];
  // const t_loading = {
  //   fr: 'Chargement...',
  //   en: 'Loading...',
  // }[language];
  const t_download = {
    fr: "Télécharger l'entente",
    en: 'Download the contract',
  }[language];
  return (
    <div>
      <BlobProvider document={<Contract />}>
        {({ blob, url, loading, error }) => {
          console.log(blob);
          return (
            !loading &&
            !error && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(url);
                }}
              >
                {t_download}
              </button>
            )
          );
        }}
      </BlobProvider>
    </div>
  );
}

const Contract = () => (
  <Document>
    <Page size="A4" style={styles.page} key={Math.random()}>
      <View style={styles.header} key={Math.random()}>
        {PDFContentParser(ReactHtmlParser(contractData.header))}
      </View>
      <View style={styles.section} key={Math.random()}>
        {PDFContentParser(
          ReactHtmlParser(contractData.sections.generalInformations),
        )}
      </View>
      <View style={styles.section} key={Math.random()}>
        {PDFContentParser(
          ReactHtmlParser(contractData.sections.rightHolders.title),
        )}
        {contractData.sections.rightHolders.list.map((rightHolder, index) => (
          <View
            style={[
              styles.rightHolderRow,
              index === contractData.sections.rightHolders.list.length - 1
                ? styles.lastRow
                : null,
            ]}
            key={Math.random()}
          >
            {PDFContentParser(ReactHtmlParser(rightHolder))}
          </View>
        ))}
      </View>
      <Text
        fixed
        key={Math.random()}
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `${contractData.footer} ${pageNumber} / ${totalPages}`
        }
      />
    </Page>
    <Page size="A4" style={styles.page} key={Math.random()}>
      <View style={styles.section} key={Math.random()}>
        {PDFContentParser(
          ReactHtmlParser(
            contractData.sections.agreementConditions.description,
          ),
        )}
        <View key={Math.random()}>
          {PDFContentParser(
            ReactHtmlParser(
              contractData.sections.agreementConditions.copyright.title,
            ),
          )}
        </View>
        <List type="numeral" key={Math.random()}>
          {ReactHtmlParser(
            contractData.sections.agreementConditions.copyright.content,
          )}
        </List>
        <View key={Math.random()}>
          {PDFContentParser(
            ReactHtmlParser(
              contractData.sections.agreementConditions.performance.title,
            ),
          )}
        </View>
        <List type="numeral" start={1} key={Math.random()}>
          {ReactHtmlParser(
            contractData.sections.agreementConditions.performance.content,
          )}
        </List>
        <View key={Math.random()}>
          {PDFContentParser(
            ReactHtmlParser(
              contractData.sections.agreementConditions.recording.title,
            ),
          )}
        </View>
        <List type="numeral" start={2} key={Math.random()}>
          {ReactHtmlParser(
            contractData.sections.agreementConditions.recording.content,
          )}
        </List>
      </View>
      <Text
        fixed
        key={Math.random()}
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `${contractData.footer} ${pageNumber} / ${totalPages}`
        }
      />
    </Page>
    <Page size="A4" style={styles.page} key={Math.random()}>
      <View style={styles.section} key="recommendations">
        {PDFContentParser(
          ReactHtmlParser(contractData.sections.recommendations),
        )}
      </View>
      <View style={styles.section} key="moralRights">
        {PDFContentParser(ReactHtmlParser(contractData.sections.moralRights))}
      </View>
      <View style={styles.section} key="otherConditions">
        {PDFContentParser(
          ReactHtmlParser(contractData.sections.otherConditions),
        )}
      </View>
      <View style={styles.section} key="signatures">
        {PDFContentParser(
          ReactHtmlParser(contractData.sections.signatures.text),
        )}
        <View style={styles.row} key={Math.random()}>
          {contractData.sections.signatures.signatories.map((signatory) => {
            return (
              <View style={styles.signatoryContainer} key={Math.random()}>
                <View style={styles.signatureBox} />
                {PDFContentParser([signatory])}
              </View>
            );
          })}
        </View>
      </View>
      <Text
        fixed
        key={Math.random()}
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `${contractData.footer} ${pageNumber} / ${totalPages}`
        }
      />
    </Page>
  </Document>
);
