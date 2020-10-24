import React, { useEffect } from 'react';
import './Message.scss';

type MessageProps = {
  typingStatus: TypingStatus;
  speaker: Speaker;
  text: string;
  onChangedStatus: (status: TypingStatus) => void;
  onAnimationEnd: () => void;
}

export default function Message(props: MessageProps) {
  const { typingStatus, speaker, text, onChangedStatus, onAnimationEnd } = props;

  useEffect(() => {
    if (typingStatus === 'TRANSITIONING') {
      // Transition to IDLE, which should trigger a new message animation
      onChangedStatus('IDLE');
    }
  }, [typingStatus, onChangedStatus]);

  switch (typingStatus) {
    case 'TRANSITIONING':
      return <div key={typingStatus}></div>;
    case 'TYPING':
      return (
        <div className="Message Message--typing" key={typingStatus}>
          <div className="Message__typing-indicator" />
          <div className="Message__typing-indicator" />
          <div className="Message__typing-indicator" />
        </div>
      );
    default:
      return (
        <div
          className={`Message ${speaker === 'ELLEN' ? 'Message--ellen' : 'Message--visitor'}`}
          key={typingStatus}
          onAnimationEnd={onAnimationEnd}
        >
          {text}
        </div>
      )
  }
}