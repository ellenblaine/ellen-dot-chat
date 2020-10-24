import React, {useState} from 'react';
import './App.scss';
import ChatBubble from './components/ChatBubble';
import InputBar from './components/InputBar';

function App() {
  const messages: Message[] = [
    {
      speaker: 'ELLEN',
      text: 'My name is Ellen 👋 Welcome to ellen.chat. Ask me anything!'
    }
  ];

  const receiveMessage = (message: string) => {
    console.log(`message was: ${message}`);
  }

  const [ready, setReady] = useState(false);

  const onChangedStatus = (newStatus: TypingStatus) => {
    if (newStatus === 'IDLE' && !ready) {
      // Ellen's first message is in, enable the input
      setReady(true);
    }
  }

  return (
    <div className="App">
      <ChatBubble message={messages[0]} initialTypingStatus={'TYPING'} onChangedStatus={onChangedStatus} />
      <InputBar onChange={receiveMessage} ready={ready} />
    </div>
  );
}

export default App;
