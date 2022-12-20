const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if(message.includes('error')){
    return (
      <div className="deleteError">
        {message}
      </div>
    )
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default Notification