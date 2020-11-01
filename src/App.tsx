import React, { useState } from 'react';
import './App.scss';
import ChatBubble from './components/ChatBubble';
import InputBar from './components/InputBar';
import MultipleChoiceMessage from './components/MultipleChoiceMessage';
import { connect } from 'react-redux'
import {
  addMessage,
  setStatus,
} from './reducer';
import { getResponse } from './utils/bot';
import { START } from './utils/constants';

type AppProps = {
  addMessage: (message: Message) => MessageAction;
  messages: Message[];
  typingStatus: TypingStatus;
  setStatus: (status: TypingStatus) => TypingStatusAction;
};

let sentFirstMessage = false;

function App(props: AppProps) {
  const { addMessage: addMessageAction, messages, typingStatus, setStatus: setStatusAction } = props;

  const [ready, setReady] = useState(false);

  const processVisitorMessage = (text: string) => {
    addMessageAction({
      speaker: 'VISITOR',
      spokenAtMillis: Date.now(),
      text
    });
    
    // Compute Ellen's response, respond after a simulated typing delay
    const { message, action } = getResponse(text, processVisitorMessage);
    setTimeout(() => {
      setStatusAction('TYPING');
      if (message) {
        addMessageAction(message);
      }
      if (action) {
        action();
      }
    }, 1000);
  }

  const onReady = () => {
    if (!ready) {
      setReady(true);
    }
  }

  if (!sentFirstMessage) {
    sentFirstMessage = true;
    processVisitorMessage(START);
  }

  const chatBubbles = messages.map((message, index) => {
    const { speaker, spokenAtMillis } = message;
    // Only Ellen gets a visible typing indicator, and only her last message
    const displayStatus = (speaker === 'ELLEN' && index === messages.length - 1) ?
      typingStatus : 'IDLE'; 
    return (
      <>
        <ChatBubble
          message={message}
          typingStatus={displayStatus}
          onChangedStatus={setStatusAction}
          key={`${index}_${spokenAtMillis}`}
          onAnimationEnd={onReady}
        />
        {
          (message.options && ready) ? (
            <MultipleChoiceMessage key={`${index}_options`} options={message.options} />
          ) : null
        }
      </>
    );
  });

  return (
    <div className="App">
      {chatBubbles}
      <InputBar onChange={processVisitorMessage} ready={ready} />
    </div>
  );
}

export default connect(
  (state: ChatListState) => {
    const { messages, typingStatus } = state;
    return {
      messages,
      typingStatus,
    };
  },
  { addMessage, setStatus }
)(App);
