function Notification(props) {
    return (
      <div
        className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-1/2 p-4 rounded-md text-white ${
          props.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}
        style={{ zIndex: 999 }}
      >
        {props.message}
      </div>
    );
  }

export default Notification;

