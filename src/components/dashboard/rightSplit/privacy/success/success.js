const Success = (props) => (
  <>
    <div className="topBar">
      <div className="title">Partage créé!</div>
      <button className="exit" onClick={() => props.setIsSaved(false)}>
        x
      </button>
    </div>
    <div className="content success">
      <div className="topIcon" />
      <div className="text1">
        Ta proposition de partage est maintenant complétée !
      </div>
      <div className="text2">
        Tu peux maintenant la proposer à tes collaborateurs. Tu pourras ensuite
        partager ta part avec ton éditeur, si tu en as un.
      </div>
      <div className="text3" />
    </div>
    <div className="downBar">
      <button
        className="btn-primary"
        onClick={() => {
          props.setIsConsulting((e) => !e);
        }}
      >
        Voir le résumé
      </button>
    </div>
  </>
);

export default Success;
