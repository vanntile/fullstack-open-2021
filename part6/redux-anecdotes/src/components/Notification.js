import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return <div style={style}>{notification.content}</div>
}

const mapStateToProps = ({ notification }) => ({ notification })

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
