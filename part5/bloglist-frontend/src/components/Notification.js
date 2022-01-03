const Notification = ({ message, type }) =>
  message == null ? null : <div className={`notification ${type}`}>{message}</div>

export default Notification
