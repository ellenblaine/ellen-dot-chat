import { openLinkedIn, openBookingSite } from './links';
import { START } from './constants';

export function getResponse(
  inbound: string,
  onOptionClick: (optionText: string) => void,
): BotResponse {
  let messageText: string | undefined;
  let messageOptions: MessageOption[] | undefined;
  let action: undefined | (() => void);
  if (inbound.toLocaleLowerCase().includes('joke')) {
    messageText = 'Why couldn\'t the bicycle stand up on its own? Because it was two tired!';
  } else if (inbound.toLocaleLowerCase().includes('linkedin')) {
    messageText = 'Directing you to LinkedIn...';
    action = () => {
      setTimeout(openLinkedIn, 2000);
    };
  } else if (inbound.toLocaleLowerCase().includes('meeting')) {
    messageText = 'Directing you to my booking site...';
    action = () => {
      setTimeout(openBookingSite, 2000);
    };
  } else if (inbound === START) {
    // Initialize the store with a first message
    messageText = 'My name is Ellen 👋 Welcome to ellen.chat. Ask me anything!\n\nOr try one of these:';
    messageOptions = [
      {
        text: 'Tell me a joke',
        onClick: () => onOptionClick('Tell me a joke'),
      },
      {
        text: 'See my resume',
        onClick: () => onOptionClick('See my resume'),
      },
      {
        text: 'Schedule a meeting',
        onClick: () => onOptionClick('Schedule a meeting'),
      },
    ];
  } else {
    messageText = 'I didn\'t understand that. Please try rephrasing.';
  }
  return {
    action,
    message: {
      speaker: 'ELLEN',
      spokenAtMillis: Date.now(),
      text: messageText,
      options: messageOptions,
    }
  }
}