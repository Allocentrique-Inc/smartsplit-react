import { useEffect, useState } from 'react';
import { useParams, Route } from 'react-router-dom';
import getWorkpiece from '../../../api/workpieces/getWorkpiece';
import RightSplit from '../rightSplit/rightSplit';
import Orientation from '../orientation/orientation';
import Documentation from '../documentation/documentation';

const Workpiece = (props) => {
  const { workpiece_id } = useParams();
  const [workpiece, setWorkpiece] = useState('');
  const [coverImage, setCoverImage] = useState();
  const resetData = async () => {
    const incomingWorkpiece = await getWorkpiece({
      workpiece_id,
    });
    setWorkpiece(incomingWorkpiece);
    if (incomingWorkpiece.documentation.files.art.length) {
      setCoverImage(
        incomingWorkpiece.documentation.files.art[incomingWorkpiece.documentation.files.art.length - 1].url,
      );
    }
  };

  const commonProps = {
    ...props,
    workpiece,
    resetData,
    workpiece_id,
    coverImage,
    setCoverImage,
  };

  useEffect(() => {
    resetData();
  }, [props.selectedWorkpiece]);

  useEffect(() => {
    if (workpiece) {
      props.setIsLoaded(true);
    } else {
      props.setIsLoaded(false);
    }
  }, [workpiece]);

  return (
    <>
      <Route path="/workpiece/:workpiece_id/right-split/">
        {workpiece && <RightSplit {...commonProps} />}
      </Route>
      <Route path="/workpiece/:workpiece_id/documentation/">
        {workpiece && <Documentation {...commonProps} />}
      </Route>
      <Route path="/workpiece/:workpiece_id/" exact>
        {workpiece && <Orientation {...commonProps} />}
      </Route>
      <Route path="/workpiece/:workpiece_id/protect/">
        <div>PROTECT</div>
      </Route>
    </>
  );
};

export default Workpiece;
