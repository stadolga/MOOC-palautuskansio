import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { deleteNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  useEffect(() => {
    if (notification) {
      const timeoutId = setTimeout(() => {
        dispatch(deleteNotification());
      }, 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [notification, dispatch]);

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification