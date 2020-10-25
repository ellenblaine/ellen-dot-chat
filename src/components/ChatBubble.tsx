import React, { useEffect } from 'react';
import Avatar from './Avatar';
import Message from './Message';
import './ChatBubble.scss';

export type ChatBubbleProps = {
  message: Message;
  typingStatus: TypingStatus;
  onChangedStatus: (status: TypingStatus) => void;
}

export default function ChatBubble(props: ChatBubbleProps) {
  const { message, typingStatus, onChangedStatus } = props;
  const { text, speaker } = message;
  
  // Create artificial typing delay for Ellen
  useEffect(() => {
    let timer: any = null;
    const isTyping = typingStatus === 'TYPING';
    if (isTyping && speaker === 'ELLEN') {
      timer = setTimeout(() => {
        onChangedStatus('TRANSITIONING');
      }, 2000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    }
  }, [onChangedStatus, typingStatus, speaker]);

  return (
    <div className="ChatBubble">
      <Avatar initials={'EB'} />
      <Message
        text={text}
        speaker={speaker}
        typingStatus={typingStatus || 'IDLE'}
        onChangedStatus={(status: TypingStatus) => onChangedStatus(status)}
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