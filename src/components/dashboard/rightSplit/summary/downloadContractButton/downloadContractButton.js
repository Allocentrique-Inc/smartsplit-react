import { memo, useState, useEffect } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import { useParams } from 'react-router-dom';
import Contract from './_/contract/contract';
import getWorkpieceContract from '../../../../../api/workpieces/getWorkpieceContract';

export default memo((props) => {
  const { language } = props;
  const t_download = {
    fr: "Télécharger l'entente",
    en: 'Download the contract',
  }[language];

  return (
    <div>
      <BlobProvider document={<Contract contractData={props.contractData} />}>
        {({ blob, url, loading, error }) => {
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
});
