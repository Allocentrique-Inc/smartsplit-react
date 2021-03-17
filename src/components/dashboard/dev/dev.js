import { useState } from 'react';
import {
  Document,
  Image,
  PDFViewer,
  Page,
  Text,
  View,
} from '@react-pdf/renderer';
import ReactHtmlParser from 'react-html-parser';
import DownloadContractButton from '../rightSplit/summary/downloadContractButton/downloadContractButton';
import PDFContentParser from '../rightSplit/summary/downloadContractButton/_/PDFContentParser';
import SmartSplit from '../rightSplit/summary/downloadContractButton/_/assets/smartsplit.png';
import styles from '../rightSplit/summary/downloadContractButton/_/styles';
import List from '../rightSplit/summary/downloadContractButton/_/list/list';

export default function Dev(props) {
  return (
    <div>
      <h1>DEV PAGE</h1>
      <DownloadContractButton />
    </div>
  );
}
