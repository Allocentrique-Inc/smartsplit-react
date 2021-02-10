const style = {
  breadCrumb: {
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
  },
};

const BreadCrumb = (props) => (
  <div style={style.breadCrumb}>{'BreadCrumb > BreadCrumb'}</div>
);

export default BreadCrumb;
