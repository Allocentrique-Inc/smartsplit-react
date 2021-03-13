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
  const editorScrollHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.deltaY);
    window._ss_zoom -= e.deltaY;
    console.log(window._ss_zoom);
    if (window._ss_zoom < 100) window._ss_zoom = 100;
    if (window._ss_zoom > 500) window._ss_zoom = 500;
    setZoom(window._ss_zoom);
  };
  useEffect(() => {
    if (editorRef.current && editorRef.current.canvas) {
      console.dir(editorRef.current.canvas);
      //setCanvas(editorRef.current.canvas);
      editorRef.current.canvas.onwheel = editorScrollHandler;
      window._ss_zoom = zoom;
    }
  }, [editorRef, file]);
  const handleClose = () => {
    setEditing(false);
  };
  return (
    <div className="avatarModal">
      <div className="modalBackground" onClick={handleClose}>
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
                    value={zoom}
                    setValue={setZoom}
                    leftLabel="zoom: "
                    range={[100, 500]}
                  />
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AvatarEditModal;
