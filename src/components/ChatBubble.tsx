import React, { useEffect } from 'react';
import Avatar from './Avatar';
import Message from './Message';
import './ChatBubble.scss';
import { START } from '../utils/constants';

export type ChatBubbleProps = {
  message: Message;
  typingStatus: TypingStatus;
  onChangedStatus: (status: TypingStatus) => void;
  onAnimationEnd: () => void;
}

export default function ChatBubble(props: ChatBubbleProps) {
  const { message, typingStatus, onChangedStatus, onAnimationEnd } = props;
  const { text, speaker, options } = message;
  
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


  if (text === START) {
    // This is a sentinel that initializes virtual Ellen
    // Don't display anything
    return null;
  }

  return (
    <div className={`ChatBubble ${speaker === 'ELLEN' ? 'ChatBubble--ellen' : 'ChatBubble--visitor'}`}>
      {
        speaker === 'ELLEN' ? 
          <Avatar imageUrl={`${process.env.PUBLIC_URL}/ellen_small.jpeg`} initials={'EB'} /> : <div />
      }
      <Message
        text={text}
        speaker={speaker}
        options={options}
        typingStatus={typingStatus || 'IDLE'}
        onChangedStatus={(status: TypingStatus) => onChangedStatus(status)}
        onAnimationEnd={onAnimationEnd}
      />
      <div />
    </div>
  );
}