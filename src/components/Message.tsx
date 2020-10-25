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

  const onFinishedIdleTransition = () => {
    if (typingStatus === 'IDLE') {
      onAnimationEnd();
    }
  }

  let content;
  switch (typingStatus) {
    case 'TRANSITIONING':
      break;
    case 'TYPING':
      content = (
        <>
          <div key="1" className="Message__typing-indicator" />
          <div key="2" className="Message__typing-indicator" />
          <div key="3" className="Message__typing-indicator" />
        </>
      );
      break;
    default:
      content = <>{text}</>
  }

  return (
    <div
      className={`Message
        ${speaker === 'ELLEN' ? 'Message--ellen' : 'Message--visitor'}
        ${typingStatus === 'TYPING' ? 'Message--typing' : ''}
      `}
      onAnimationEnd={onFinishedIdleTransition}
      key={typingStatus}
    >
      {content}
    </div>
  )
}