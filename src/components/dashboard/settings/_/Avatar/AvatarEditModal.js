import { useState, useRef, useEffect } from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
import X from '../../../../../icons/x';
import Slider from '../../../../_/form/slider/Slider';

const AvatarEditModal = (props) => {
  const { setEditing } = props;
  const [saving, setSaving] = useState();
  const [zoom, setZoom] = useState(150);
  const [file, setFile] = useState(null);
  const [canvas, setCanvas] = useState();
  const editorRef = useRef();
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
    setEditing(false);
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
    <div className="avatarModal">
      <div className="modalBackground">
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="topBar">
            <h4>Edit Profile Picture</h4>
            <button
              className="btn-icon"
              disabled={saving}
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
                      width={200}
                      height={200}
                      borderRadius={100}
                      scale={zoom / 100}
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
                </>
              )}

            </div>
          </div>

          <div className="downBar">
            <button className="btn-secondary" onClick={handleClose}>cancel</button>
            <button className={file ? 'btn-primary' : 'btn-disabled'} disabled={!file}>Crop and Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AvatarEditModal;
