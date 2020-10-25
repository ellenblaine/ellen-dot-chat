export const ChatListReducer = (
  state: ChatListState,
  action: MessageAction | TypingStatusAction,
): ChatListState => {
  switch (action.type) {
    case 'CHANGE_TYPING_STATUS':
      return {
        ...state,
        typingStatus: action.payload, // a typing status
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          action.payload, // a message
        ]
      }
    default:
      return state;
  }
}

export const addMessage = (
  payload: Message
): MessageAction => ({
  payload,
  type: 'ADD_MESSAGE',
});

export const setStatus = (
  payload: TypingStatus
): TypingStatusAction => ({
  payload,
  type: 'CHANGE_TYPING_STATUS',
});