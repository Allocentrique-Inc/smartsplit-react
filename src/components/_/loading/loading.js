// import loading from './loading.gif';

export default (props) => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        backgroundColor: '#eee',
        opacity: '0.5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '1000',
      }}
    >
      {/* <img
        style={{
          color: '#eee',
          opacity: '0.5',
        }}
        alt="loading"
        src={loading}
      /> */}
    </div>
  );
};
