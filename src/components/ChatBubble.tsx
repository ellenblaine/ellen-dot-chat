import React, { useState, useEffect } from 'react';
import Avatar from './Avatar';
import Message from './Message';
import './ChatBubble.scss';

export type ChatBubbleProps = {
  message: Message;
  initialTypingStatus?: TypingStatus;
  onChangedStatus: (status: TypingStatus) => void;
}

export default function ChatBubble(props: ChatBubbleProps) {
  const { message, initialTypingStatus, onChangedStatus } = props;
  const { text, speaker } = message;
  const [typingStatus, setTypingStatus] = useState(initialTypingStatus);
  
  // Create artificial typing delay for Ellen
  useEffect(() => {
    let timer: any = null;
    const isTyping = typingStatus === 'TYPING';
    if (isTyping && speaker === 'ELLEN') {
      timer = setTimeout(() => {
        setTypingStatus('TRANSITIONING');
      }, 2000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    }
  }, [typingStatus, speaker]);

  return (
    <div className="ChatBubble">
      <Avatar initials={'EB'} />
      <Message
        text={text}
        speaker={speaker}
        typingStatus={typingStatus || 'IDLE'}
        onChangedStatus={(status: TypingStatus) => setTypingStatus(status)}
        onAnimationEnd={() => {
          if (typingStatus === 'IDLE') {
            onChangedStatus(typingStatus);
          }
        }}
      />
      <div />
    </div>
  );
}