import { useEffect, useState } from 'react';
import { useParams, Route } from 'react-router-dom';
import getWorkpiece from '../../../api/workpieces/getWorkpiece';
import RightSplit from '../rightSplit/rightSplit';
import Orientation from '../orientation/orientation';
import Documentation from '../documentation/documentation';
import Monetize from '../monetize/monetize';

const Workpiece = (props) => {
  const { workpiece_id } = useParams();
  const [workpiece, setWorkpiece] = useState('');
  const resetData = async () => {
    const incomingWorkpiece = await getWorkpiece({
      workpiece_id,
    });
    setWorkpiece(incomingWorkpiece);
  };

  const coverImage =
    workpiece &&
    workpiece.documentation &&
    workpiece.documentation.files &&
    workpiece.documentation.files.art &&
    workpiece.documentation.files.art.length
      ? workpiece.documentation.files.art[
          workpiece.documentation.files.art.length - 1
        ].url
      : null;

  const commonProps = {
    ...props,
    workpiece,
    resetData,
    workpiece_id,
    coverImage,
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
      <Route path="/workpiece/:workpiece_id/monetize" exact>
        {workpiece && <Monetize {...commonProps} />}
      </Route>
      <Route path="/workpiece/:workpiece_id/protect/">
        <div>PROTECT</div>
      </Route>
    </>
  );
};

export default Workpiece;
