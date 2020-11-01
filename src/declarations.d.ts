type Speaker = 'ELLEN' | 'VISITOR';

type TypingStatus = 'TYPING' | 'IDLE' | 'TRANSITIONING';

type Message = {
  speaker: Speaker;
  spokenAtMillis: number;
  text: string;
  options?: MessageOption[];
}

type MessageOption = {
  text: string;
  onClick: () => void;
}

type MessageAction = {
  type: 'ADD_MESSAGE';
  payload: Message;
}

type TypingStatusAction = {
  type: 'CHANGE_TYPING_STATUS';
  payload: TypingStatus;
}

type ChatListState = {
  messages: Message[];
  typingStatus: TypingStatus;
}

type BotResponse = {
  action?: () => void;
  message?: Message;
}

type RichText = string;

declare module 'react-redux';