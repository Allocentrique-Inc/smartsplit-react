import { useState } from 'react';
import AddOrEditWorkpieceMobile from '../../_/addOrEditWorkpieceMobile/addOrEditWorkpieceMobile';
import MobileTopBar from '../../_/mobileTopBar/mobileTopBar';
import Tabs, { Tab } from '../../_/tabs/tabs';
import ProfileOptions from '../../_/profileOptions/profileOptions';
import ArtistName from '../../_/artistName/artistName';
import LastModified from '../../_/lastModified/lastModified';
import Pen from '../../../../icons/pen';
import Tile from '../tile/tile';

export default function MobileOrientation(props) {
  const {
    handleBackButton,
    t_createdBy,
    t_modified,
    t_title,
    t_tasks,
    hasEditPermission,
  } = props;

  const tabNames = [t_tasks];
  const [showWorkpieceForm, setShowWorkpieceForm] = useState(false);

  return (
    <>
      {!showWorkpieceForm && (
        <div className="mobileOrientation">
          <MobileTopBar
            back={handleBackButton}
            noShadow
            action={<ProfileOptions {...props} />}
          />
          <main>
            <div className="row">
              <div className="left">
                <h1>{t_title}</h1>
                <div className="details">
                  {t_createdBy}
                  <ArtistName
                    user={props.workpiece.owner}
                    className="artistName"
                  />
                  {' · '}
                  <LastModified {...props}>{t_modified}</LastModified>
                </div>
              </div>
              {hasEditPermission && (
                <button
                  className="btn-icon"
                  onClick={() => setShowWorkpieceForm(true)}
                >
                  <Pen />
                </button>
              )}
            </div>
            <Tabs options={tabNames}>
              <Tab key={tabNames[0]}>
                <Tile tileId="share" {...props} />
                <Tile tileId="monetize" {...props} />
              </Tab>
            </Tabs>
          </main>
        </div>
      )}
      {showWorkpieceForm && (
        <AddOrEditWorkpieceMobile
          {...props}
          setShowWorkpieceForm={setShowWorkpieceForm}
        />
      )}
    </>
  );
}
