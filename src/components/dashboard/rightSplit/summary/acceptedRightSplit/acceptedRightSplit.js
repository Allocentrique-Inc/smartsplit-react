import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LastModified from '../../../_/lastModified/lastModified';
import getWorkpieceContract from '../../../../../api/workpieces/getWorkpieceContract';
import DownloadContractButton from '../downloadContractButton/downloadContractButton';
import PaymentModal from '../../../_/payments/PaymentModal';
import ArtistName from '../../../_/artistName/artistName';

const AcceptedRightSplit = (props) => {
  const versionIndex = props.workpiece.rightSplit.version;
  const productCode = 'RIGHT_SPLIT_CONTRACT';
  const [showPaymentModal, setShowPaymentModal] = useState();
  const { workpiece_id } = useParams();
  const [contractData, setContractData] = useState();
  const modalProps = {
    ...props,
    productCode,
    setShowModal: setShowPaymentModal,
  };
  const hasBoughtPDF =
    props.workpiece &&
    props.workpiece.purchases &&
    props.workpiece.purchases.length !== 0 &&
    props.workpiece.purchases.includes(productCode);
  useEffect(async () => {
    const result = await getWorkpieceContract({ workpiece_id });
    !result.statusCode && setContractData(result);
    result.statusCode && setContractData(null);
  }, []);
  return (
    <>
      <div className="rightSplit" style={{ marginBottom: '8px' }}>
        <div className="clickableContainer" onClick={props.handleClick}>
          <div className="title">{`Version ${versionIndex}`}</div>
          <div className="details">
            {props.t_createdBy}
            <ArtistName
              user={props.workpiece.rightSplit.owner}
              className="artistName"
            />{' '}
            <LastModified
              date={props.workpiece.rightSplit.createdAt}
              language={props.language}
            />
          </div>
          <div className="b1">
            <div />
            <div className="status acceptedStatus">{props.t_accepted}</div>
          </div>
          {contractData && (
            <DownloadContractButton
              {...props}
              language={props.language}
              contractData={contractData}
            />
          )}
          {/* {hasBoughtPDF && contractData ? (
          <DownloadContractButton
            language={props.language}
            contractData={contractData}
          />
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowPaymentModal(true);
            }}
          >
            {props.t_download}
          </button>
        )}*/}
        </div>
      </div>
      {showPaymentModal && <PaymentModal {...modalProps} />}
    </>
  );
};

export default AcceptedRightSplit;
