import { useState, useEffect } from 'react';
// import emailValidator from 'email-validator';
import submitRightSplit from '../../../../../api/workpieces/submitRightSplit';
import PageErrors from '../../_/pageErrors/pageErrors';
import X from '../../../../../icons/x';
import ProfilePlaceholder from '../../../../../icons/profilePlaceholder';
import CollaboratorErrors from '../../_/collaboratorErrors/collaboratorErrors';

const AdjustEmails = (props) => {
  const [emails, setEmails] = useState({});
  const [triedSubmit, setTriedSubmit] = useState(true);
  const allArrays = [
    ...props.workpiece.rightSplit.copyright,
    ...props.workpiece.rightSplit.performance,
    ...props.workpiece.rightSplit.recording,
    props.workpiece.rightSplit &&
    props.workpiece.rightSplit.label &&
    props.workpiece.rightSplit.label.rightHolder_id
      ? props.workpiece.rightSplit.label
      : '',
  ].filter((el) => el !== '');
  const allActors = [];
  allArrays.forEach((el) => {
    if (!allActors.find((EL) => EL.rightHolder_id === el.rightHolder_id)) {
      allActors.push(el);
    }
  });

  allActors.forEach((el) => {
    el.errors = [];
    const email = emails[el.rightHolder_id];
    const legitEmail = true; // emailValidator.validate(email);
    if (!legitEmail) {
      el.errors.push('collaboratorShallHaveLegitEmail');
    }
  });

  useEffect(() => {
    const alfa = {};
    allActors.forEach((el) => {
      const { emails } = el.rightHolder;
      alfa[el.rightHolder_id] = emails[0];
    });
    setEmails(alfa);
  }, []);

  const calculatePageError = () => {
    const pageErrors = [];
    const collaboratorsContainsError = allActors.some(
      (el) => el.errors.length > 0,
    );
    if (collaboratorsContainsError) {
      pageErrors.push('allShallContainEmail');
    }
    return pageErrors;
  };
  const pageErrors = calculatePageError();

  const handleSubmitRightSplit = async (e) => {
    e.stopPropagation();
    setTriedSubmit(true);
    if (pageErrors.length === 0) {
      await submitRightSplit({
        workpiece_id: props.workpiece.workpiece_id,
        emails,
      });
      setEmails({});
      props.setShowModal(false);
      props.setIsAdjustingEmails(false);
      props.resetData();
    }
  };

  const t_title =
    props.translations.rightSplit.summary.adjustEmail._title[props.language];
  const t_presentation =
    props.translations.rightSplit.summary.adjustEmail._presentation[
      props.language
    ];
  const t_envoyer =
    props.translations.rightSplit.summary.adjustEmail._send[props.language];
  const t_annuler =
    props.translations.rightSplit.summary.adjustEmail._cancel[props.language];

  const commonProps = { ...props, triedSubmit, setTriedSubmit };

  console.log(triedSubmit);
  return (
    <div className="sendSplitModal">
      <div
        className="modalBackground"
        onClick={() => {
          props.setShowModal(false);
          props.setIsAdjustingEmails(false);
        }}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="topBar">
            <div className="title">{t_title}</div>
            <div
              className="exit"
              onClick={() => {
                props.setShowModal(false);
                props.setIsAdjustingEmails(false);
              }}
            >
              <X />
            </div>
          </div>
          <div className="content">
            <p>{t_presentation}</p>
            {allActors.map((collaborator) => {
              const collaboratorClassName =
                collaborator &&
                collaborator.errors &&
                collaborator.errors.length > 0 &&
                triedSubmit
                  ? 'collaborator collaboratorErrors'
                  : 'collaborator';
              return (
                <>
                  <div
                    className={collaboratorClassName}
                    key={collaborator.rightHolder_id}
                  >
                    <ProfilePlaceholder small />
                    <div className="formInput">
                      <label>
                        {`${collaborator.rightHolder.firstName} ${collaborator.rightHolder.lastName}`}
                      </label>
                      <input
                        value={emails[collaborator.rightHolder_id]}
                        onChange={(e) => {
                          const alfa = { ...emails };
                          alfa[collaborator.rightHolder_id] = e.target.value;
                          setEmails(alfa);
                        }}
                      />
                    </div>
                  </div>
                  <CollaboratorErrors
                    {...commonProps}
                    collaborator={collaborator}
                  />
                </>
              );
            })}
            {triedSubmit && <PageErrors {...commonProps} errors={pageErrors} />}
          </div>
          <div className="downBar">
            <button
              className="btn-secondary"
              style={{ marginRight: '10px' }}
              onClick={() => {
                props.setShowModal(false);
                props.setIsAdjustingEmails(false);
              }}
            >
              {t_annuler}
            </button>
            <button
              className="btn-primary"
              onClick={handleSubmitRightSplit}
              disabled={pageErrors.length !== 0}
            >
              {t_envoyer}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdjustEmails;
