import React from 'react'

export default class MessageList extends React.Component {
    render() {
      return (
        <ul className="message-list">                 
          {this.props.messages.map(message => {
            return (
             <li key={message.id}>
               <div>
                 {message.userId}
               </div>
               <div>
                 {message.message}
               </div>
             </li>
           )
         })}
       </ul>
      )
    }
  }
