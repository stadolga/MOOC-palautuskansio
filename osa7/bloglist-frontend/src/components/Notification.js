import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  if (notification === null) {
    return null;
  }
  if (notification.includes("error")) {
    return <div className="deleteError">{notification}</div>;
  }
  return <div className="error">{notification}</div>;
};
export default Notification;
