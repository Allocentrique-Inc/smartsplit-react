import { PDFViewer } from '@react-pdf/renderer';
import { Contract } from '../rightSplit/summary/downloadContractButton/downloadContractButton';

export default function Dev(props) {
  return (
    <div>
      <h1>DEV PAGE</h1>
      <PDFViewer width={595} height={842}>
        <Contract />
      </PDFViewer>
    </div>
  );
}
