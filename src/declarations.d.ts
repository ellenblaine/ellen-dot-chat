type Speaker = 'ELLEN' | 'VISITOR';

type TypingStatus = 'TYPING' | 'IDLE' | 'TRANSITIONING';

type Message = {
  speaker: Speaker;
  text: string;
}