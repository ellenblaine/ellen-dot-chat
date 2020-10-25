import React, { useState, useReducer } from 'react';
import './App.scss';
import ChatBubble from './components/ChatBubble';
import InputBar from './components/InputBar';
import {
  ChatListReducer,
  addMessage as addMessageAction,
  setStatus,
} from './reducer';

const initialState: ChatListState = {
  messages: [
    {
      speaker: 'ELLEN',
      spokenAtMillis: Date.now(),
      text: 'My name is Ellen 👋 Welcome to ellen.chat. Ask me anything!'
    },
  ],
  typingStatus: 'TYPING',
}

function App() {
  const [chatState, dispatch] = useReducer(ChatListReducer, initialState);

  const addMessage = (text: string, speaker: Speaker) => {
    return addMessageAction({ speaker, spokenAtMillis: Date.now(), text });
  }

  const letEllenRespondToMessage = (text: string) => {
    // Start to respond after a delay
    setTimeout(() => {
      dispatch(setStatus('TYPING'));
      dispatch(addMessage('This is Ellen\'s response', 'ELLEN'));
    }, 2000);
  }

  const recordVisitorMessage = (text: string) => {
    dispatch(addMessage(text, 'VISITOR'));
    letEllenRespondToMessage(text);
  }

  const [ready, setReady] = useState(false);

  const onChangedStatus = (newStatus: TypingStatus) => {
    if (newStatus === 'IDLE' && !ready) {
      // Ellen's first message is in, enable the input
      setReady(true);
    }
    dispatch(setStatus(newStatus));
  }

  const { messages, typingStatus: ellenTypingStatus } = chatState;
  const chatBubbles = messages.map((message, index) => {
    const { speaker, spokenAtMillis } = message;
    // Only Ellen gets a typing indicator, and only her last message
    const typingStatus = (speaker === 'ELLEN' && index === messages.length - 1) ?
      ellenTypingStatus : 'IDLE'; 
    return (
      <ChatBubble
        message={message}
        typingStatus={typingStatus}
        onChangedStatus={onChangedStatus}
        key={spokenAtMillis}
      />
    );
  });

  return (
    <div className="App">
      {chatBubbles}
      <InputBar onChange={recordVisitorMessage} ready={ready} />
    </div>
  );
}

export default App;
