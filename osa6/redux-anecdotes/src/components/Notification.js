import { connect } from 'react-redux';

const Notification = ({notification}) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}
const mapStateToProps = state => ({
  notification: state.notifications,
});
export default connect(mapStateToProps)(Notification);