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
  } else if (inbound.toLocaleLowerCase().includes('resume')) {
    messageText = 'Directing you to LinkedIn...';
    action = () => {
      setTimeout(openLinkedIn, 5000);
    };
  } else if (inbound.toLocaleLowerCase().includes('meeting')) {
    messageText = 'Directing you to my booking site...';
    action = () => {
      setTimeout(openBookingSite, 5000);
    };
  } else if (inbound.toLocaleLowerCase().includes('hi') || inbound.toLocaleLowerCase().includes('hello')) {
    messageText = 'Howdy!'
  } else if (inbound === START) {
    // Initialize the store with a first message
    messageText = 'Welcome! My name is Ellen 👋 Ask me anything!\n\nOr try one of these:';
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