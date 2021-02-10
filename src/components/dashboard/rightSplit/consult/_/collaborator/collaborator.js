import Vote from '../vote/vote';

const style = {
  b1: {
    border: '1px solid black',
    padding: '10px',
    margin: '10px',
  },
  b1b1: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '500',
  },
  role: {},
  shares: {
    fontWeight: '800',
  },
  status: {},
};

const Collaborator = (props) => (
  <div style={style.b1}>
    <div style={style.b1b1}>
      <div>
        <div style={style.name}>
          {`${props.collaborator.rightHolder.firstName} ${props.collaborator.rightHolder.lastName}`}
        </div>
      </div>
      <div>
        <div style={style.shares}>{`${props.collaborator.shares} %`}</div>

        <div style={style.state}>{props.collaborator.vote}</div>
      </div>
    </div>
    <Vote {...props} />
  </div>
);

export default Collaborator;
