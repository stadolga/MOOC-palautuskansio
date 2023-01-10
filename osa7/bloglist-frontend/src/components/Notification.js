import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Notification() {
  const notification = useSelector((state) => state.notifications);

  if (notification === null) {
    return null;
  }
  if (notification.includes('error')) {
    return <Alert variant="danger">{notification}</Alert>;
  }
  return <Alert variant="success">{notification}</Alert>;
}
export default Notification;
