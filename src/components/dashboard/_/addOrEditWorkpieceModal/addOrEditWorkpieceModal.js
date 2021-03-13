import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import postWorkpiece from '../../../../api/workpieces/postWorkpiece';
import patchWorkpiece from '../../../../api/workpieces/patchWorkpiece';
import uploadDocFile from '../../../../api/workpieces/uploadFile';
import X from '../../../../icons/x';
import useForm from '../../../_/form/useForm';
import FormInput from '../../../_/form/formInput/formInput';
import EditCoverImage from '../coverImage/EditCoverImage';

export default function WorkpieceModal(props) {
  console.log(props);
  const {
    setShowModal,
    resetData,
    workpiece_id = null,
    language,
    translations,
    workpiece,
  } = props;
  const history = useHistory();
  const form = useForm({
    title: {
      value: workpiece ? workpiece.title : '',
      errors: [],
      validators: ['required'],
    },
  });
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [type, setType] = useState({
    primary: '',
    secondary: '',
  });
  const [file, setFile] = useState({
    data: '',
    version: '',
  });
  const [composer, setComposer] = useState('');
  const [imgBlob, setImgBlob] = useState(null);
  const isAdding = workpiece_id === null;
  const handleConfirm = async () => {
    if (form.isValid()) {
      props.setIsLoaded(false);
      const result = isAdding
        ? await postWorkpiece(form.toJS())
        : await patchWorkpiece({ workpiece_id, ...form.toJS() });
      if (imgBlob) {
        // save image

        const id = result.workpiece_id;
        //console.log(imgBlob);
        const file = new File([imgBlob], 'canvas-image.png');
        const response = await uploadDocFile(
          id,
          file,
          'art',
          'public',
          (progress) => { console.log(progress); },
        );
        //console.log(response);
      }
      setShowModal(false);
      document.location.reload();
      if (isAdding) {
        if (result && result.workpiece_id) {
          history.push(`/workpiece/${result.workpiece_id}`);
        }
      }
    }
    setTriedSubmit(true);
  };
  const handleCoverImageSave = async (imageData, blob) => {
    setImgBlob(blob);
  };
  const commonProps = {
    language,
    errorTranslations: translations.publicPages.formErrors,
    triedSubmit,
  };

  const t_topBar =
    translations.workpieces.workpieceModal.topBar.title[
      isAdding ? '_create' : '_edit'
    ][language];
  const t_title_label =
    translations.workpieces.workpieceModal.fields.title._label[language];
  const t_title_hint =
    translations.workpieces.workpieceModal.fields.title._hint[language];
  const t_cancel =
    translations.workpieces.workpieceModal.downBar._cancel[language];
  const t_submit =
    translations.workpieces.workpieceModal.downBar.submit[
      isAdding ? '_create' : '_edit'
    ][language];
  console.log(isAdding);
  return (
    <div className="workpieceModal">
      <div className="modalBackground" onClick={() => setShowModal(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="topBar">
            <h4>{t_topBar}</h4>
            <button className="btn-icon" onClick={() => setShowModal(false)}>
              <X />
            </button>
          </div>
          <div className="content">
            <FormInput errors={form.fields.title.errors} {...commonProps}>
              <label htmlFor="workpieceTitle">{t_title_label}</label>
              <input
                type="text"
                id="workpieceTitle"
                value={form.fields.title.value}
                onChange={form.handlers.title}
              />
              <div className="hint">{t_title_hint}</div>
            </FormInput>
            <div className="formInput">
              <label>Cover Image</label>
              <EditCoverImage mode={!isAdding || imgBlob ? 'edit' : 'create'} onSave={handleCoverImageSave} {...props} />
            </div>
            <div className="formInput toDo">
              <label htmlFor="type">Cette oeuvre est...</label>
              <div className="radioGroup" id="type">
                <label>
                  <input
                    type="radio"
                    value="original"
                    checked={type.secondary === 'original'}
                    onChange={() => {
                      setType(() => ({ ...type, secondary: 'original' }));
                    }}
                  />
                  une création originale
                </label>
                <label>
                  <input
                    type="radio"
                    value="cover"
                    checked={type.secondary === 'cover'}
                    onChange={() => {
                      setType(() => ({ ...type, secondary: 'cover' }));
                    }}
                  />
                  une reprise (cover)
                </label>
                <label>
                  <input
                    type="radio"
                    value="remix"
                    checked={type.secondary === 'remix'}
                    onChange={() => {
                      setType(() => ({ ...type, secondary: 'remix' }));
                    }}
                  />
                  un remix
                </label>
              </div>
            </div>
            {type.secondary === 'original' && (
              <div className="formInput toDo">
                <label>{`${form.fields.title.value}, par`}</label>
                <input type="text" />
              </div>
            )}
            {(type.secondary === 'remix' || type.secondary === 'cover') && (
              <>
                <div className="formInput toDo">
                  <label>Artiste ou groupe originel</label>
                  <input
                    type="text"
                    value={composer}
                    onChange={(e) => setComposer(e.target.value)}
                  />
                </div>
                <div className="formInput toDo">
                  <label>
                    {`${form.fields.title.value} (${composer}), 
                  ${type.secondary === 'cover' ? 'repris' : 'remixé'} par`}
                  </label>
                  <input type="text" />
                </div>
              </>
            )}

            <div className="row">
              <div className="formInput toDo">
                <label>
                  Fichier
                  <span style={{ color: '#687A8B', fontWeight: 'normal' }}>
                    {' '}
                    Optionnel
                  </span>
                </label>
                <input
                  type="file"
                  className="btn-primary filePicker"
                  onChange={(e) =>
                    setFile((prevState) => ({
                      ...prevState,
                      data: e.target.files[0],
                    }))
                  }
                />
                <div className="hint">
                  Format WAV ou MP3 seulement. 100 Mo maximum.
                </div>
              </div>
              <div className="formInput toDo">
                <label>Version de travail</label>
                <input
                  type="text"
                  value={file.version}
                  onChange={(e) =>
                    setFile((prevState) => ({
                      ...prevState,
                      version: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="formInput toDo">
              <label>
                Qui a collaboré sur cette pièce musicale?
                <span style={{ color: '#687A8B', fontWeight: 'normal' }}>
                  {' '}
                  Optionnel
                </span>
              </label>
              <input
                type="text"
                placeholder="Ajouter un ou plusieurs collaborateurs..."
              />
              <div className="hint">
                Ces collaborateurs seront automatiquement ajoutés au partage de
                droit. Vous pourrez toujours les retirer du partage
              </div>
            </div>
            <div className="formInput toDo">
              <label>Cette pièce musicale sort elle avec un label?</label>
              <input
                type="text"
                placeholder="Rechercher ou ajouter un label..."
              />
            </div>
          </div>
          <div className="downBar">
            <button
              className="btn-secondary"
              onClick={() => setShowModal(false)}
            >
              {t_cancel}
            </button>
            <button onClick={handleConfirm} className="btn-primary">
              {t_submit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
