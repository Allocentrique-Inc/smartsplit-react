import { BlobProvider } from '@react-pdf/renderer';
import { memo } from 'react';
import Contract from './_/contract/contract';

export default memo((props) => {
  const { language } = props;
  const t_download = {
    fr: "Télécharger l'entente",
    en: 'Download the contract',
  }[language];
  return (
    <div>
      <BlobProvider document={<Contract />}>
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
