import React, { useState, useReducer } from 'react';
import './App.scss';
import ChatBubble from './components/ChatBubble';
import InputBar from './components/InputBar';
import MultipleChoiceMessage from './components/MultipleChoiceMessage';
import {
  ChatListReducer,
  addMessage as addMessageAction,
  setStatus,
} from './reducer';

const openLinkedIn = (): void => {
  window.open('https://www.linkedin.com/in/ellen-blaine-a95432a2/', '_blank');
}

function App() {
  const [chatState, dispatch] = useReducer(ChatListReducer, { typingStatus: 'TYPING', messages: [] });
  const [ready, setReady] = useState(false);

  const addMessage = (text: string, speaker: Speaker, options?: MessageOption[]) => {
    return addMessageAction({
      speaker,
      spokenAtMillis: Date.now(),
      text,
      options,
    });
  }

  const letEllenRespondToMessage = (text: string) => {
    let response = 'I didn\'t understand that. Please try rephrasing.';
    if (text.toLocaleLowerCase().includes('joke')) {
      response = 'Why couldn\'t the bicycle stand up on its own? Because it was two tired!';
    } else if (text.toLocaleLowerCase().includes('linkedin')) {
      openLinkedIn();
    }
    // Start to respond after a delay
    setTimeout(() => {
      dispatch(setStatus('TYPING'));
      dispatch(addMessage(response, 'ELLEN'));
    }, 1000);
  }

  const recordVisitorMessage = (text: string) => {
    dispatch(addMessage(text, 'VISITOR'));
    letEllenRespondToMessage(text);
  }

  const { messages, typingStatus: ellenTypingStatus } = chatState;

  if (messages.length === 0) {
    // Initialize state with the first messages
    dispatch(addMessage(
      'My name is Ellen 👋 Welcome to ellen.chat. Ask me anything!\n\nOr try one of these:',
      'ELLEN',
      [
        {
          text: 'Tell me a joke',
          onClick: () => recordVisitorMessage('Tell me a joke'),
        },
        {
          text: 'See my resume',
          onClick: openLinkedIn,
        },
      ]
    ));
  }


  const onChangedStatus = (newStatus: TypingStatus) => {
    dispatch(setStatus(newStatus));
  }

  const onReady = () => {
    if (!ready) {
      setReady(true);
    }
  }

  const chatBubbles = messages.map((message, index) => {
    const { speaker, spokenAtMillis } = message;
    // Only Ellen gets a typing indicator, and only her last message
    const typingStatus = (speaker === 'ELLEN' && index === messages.length - 1) ?
      ellenTypingStatus : 'IDLE'; 
    return (
      <>
        <ChatBubble
          message={message}
          typingStatus={typingStatus}
          onChangedStatus={onChangedStatus}
          key={`${index}_${spokenAtMillis}`}
          onAnimationEnd={onReady}
        />
        {
          (message.options && ready) ? <MultipleChoiceMessage options={message.options} /> : null
        }
      </>
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
