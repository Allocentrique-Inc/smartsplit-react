import { useState, useRef, useEffect } from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
import PropTypes from 'prop-types';
import X from '../../../../icons/x';
import Slider from '../../../_/form/slider/Slider';
import RotateCounterClockwise from '../../../../icons/rotate-counter-clockwise';
import RotateClockwise from '../../../../icons/rotate-clockwise';

const PictureEditModal = (props) => {
  const { shape, size, onSave, onClose, hiRes, title } = props;
  const [zoom, setZoom] = useState(150);
  const [rotation, setRotation] = useState(0);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const editorRef = useRef();
  const handleSave = async () => {
    setSaving(true);
    // if hiRes is true, get the cropped image at the original resolution
    const canvas = hiRes ? editorRef.current.getImage() : editorRef.current.getImageScaledToCanvas();

    canvas.toBlob((blob) => {
      onSave(canvas.toDataURL(), blob);
      setSaving(false);
      onClose();
    });
  };
  const handleFilesSelection = (e) => {
    if (e.target.files.length) setFile(e.target.files[0]);
  };
  /**
   * use the wheel events to zoom on the canvas ref we derive.
   * for some reason the event does not scope with our state vars
   * seems to need globals thus _av_zoom
   *
   * it's safe because we only use the modal one instance at a time
   * so no conflicts
   *
   * @param e {MouseWheelEvent}
   */
  const editorScrollHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.deltaY);
    window._av_zoom -= e.deltaY;
    console.log(window._av_zoom);
    if (window._av_zoom < 100) window._av_zoom = 100;
    if (window._av_zoom > 500) window._av_zoom = 500;
    setZoom(window._av_zoom);
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (editorRef.current && editorRef.current.canvas) {
      console.dir(editorRef.current.canvas);
      //setCanvas(editorRef.current.canvas);
      editorRef.current.canvas.onwheel = editorScrollHandler;
      window._av_zoom = zoom;
    }
  }, [editorRef, file]);
  return (
    <div className="picture-edit-modal">
      <div className="modalBackground">
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="topBar">
            <h4>{title}</h4>
            <button
              className="btn-icon"
              onClick={handleClose}
            >
              <X />
            </button>
          </div>
          <div className="content">
            <div className="image-editor">
              <div className="image-selector"><input type="file" onChange={handleFilesSelection} /></div>
              {file && (
                <>
                  <div className="editor-container">
                    <ReactAvatarEditor
                      image={file}
                      width={size}
                      height={size}
                      borderRadius={shape.toLowerCase() === 'circle' ? size / 2 : 0}
                      scale={zoom / 100}
                      rotate={rotation}
                      ref={editorRef}
                    />
                  </div>
                  <Slider
                    className="avatar-slider"
                    value={zoom}
                    setValue={setZoom}
                    leftLabel="zoom: "
                    range={[100, 500]}
                  />
                  <div className="rotate-button-container">
                    <label>Rotate:</label>
                    <button
                      className="btn-primary-small"
                      style={{ width: '30px', marginLeft: '0.5em' }}
                      onClick={() => { setRotation((rotation - 90 < -360) ? -90 : rotation - 90); }}
                    >
                      <RotateCounterClockwise color="#fff" />
                    </button>
                    <button
                      className="btn-primary-small"
                      style={{ width: '30px', marginLeft: '0.5em' }}
                      onClick={() => { setRotation((rotation + 90 > 360) ? 90 : rotation + 90); }}
                    >
                      <RotateClockwise color="#fff" />
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>

          <div className="downBar">
            <button className="btn-secondary" onClick={handleClose}>cancel</button>
            <button className={file && !saving ? 'btn-primary' : 'btn-disabled'} disabled={!file || saving} onClick={handleSave}>{saving ? 'Saving...' : 'Crop and Save'}</button>

          </div>
        </div>
      </div>
    </div>
  );
};
PictureEditModal.propTypes = {
  shape: PropTypes.oneOf(['square', 'circle']),
  size: PropTypes.number,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  hiRes: PropTypes.bool,
  title: PropTypes.string,
};
PictureEditModal.defaultProps = {
  shape: 'square',
  size: 200,
  hiRes: false,
  title: 'Create / Edit Image',

};
export default PictureEditModal;
