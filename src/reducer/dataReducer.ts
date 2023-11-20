import { MessageT } from "../context/data-context";
import { ACTION_TYPES, MAX_BOARDS, SORT_ORDER } from "../utils/constants";

export const initState = {
  messages: [] as MessageT[],
  sortBy: "",
  messagesToShow: [],
  activePage: 0
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.INITIALIZE_MESSAGE:
      return {
        ...state,
        messages: [...payload].sort((a, b) => {
          const timeStampA = new Date(a.timestamp);
          const timeStampB = new Date(b.timestamp);
          return timeStampB - timeStampA;
        }),
        messagesToShow: [...payload]
          .sort((a, b) => {
            const timeStampA = new Date(a.timestamp);
            const timeStampB = new Date(b.timestamp);
            return timeStampB - timeStampA;
          })
          .slice(state.activePage * MAX_BOARDS, MAX_BOARDS),
        sortBy: SORT_ORDER.SORT_DESCENDING
      };

    case ACTION_TYPES.ADD_MESSAGE:
      const newActivePage =
        state.sortBy === SORT_ORDER.SORT_ASCENDING
          ? state.messagesToShow.length >= MAX_BOARDS
            ? state.activePage + 1
            : state.activePage
          : 0;
      const newMessagesToShow = state.messages.slice(
        newActivePage * MAX_BOARDS,
        newActivePage * MAX_BOARDS + (MAX_BOARDS - 1)
      );

      return {
        ...state,
        activePage: newActivePage,
        messages:
          state.sortBy === SORT_ORDER.SORT_ASCENDING
            ? [...state.messages, payload]
            : [payload, ...state.messages],
        messagesToShow:
          state.sortBy === SORT_ORDER.SORT_ASCENDING
            ? [...newMessagesToShow, payload]
            : [payload, ...newMessagesToShow]
      };

    case ACTION_TYPES.DELETE_MESSAGE:
      const filteredMessages = state.messages.filter(
        (msg) => msg.id !== payload
      );
      return {
        ...state,
        messages: filteredMessages,
        messagesToShow: filteredMessages.slice(
          state.activePage * MAX_BOARDS,
          state.activePage * MAX_BOARDS + MAX_BOARDS
        )
      };

    case ACTION_TYPES.SORT_ASCENDING:
      return {
        ...state,
        sortBy: SORT_ORDER.SORT_ASCENDING,
        messages: [...state.messages].sort((a, b) => {
          const timeStampA = new Date(a.timestamp);
          const timeStampB = new Date(b.timestamp);
          return timeStampA - timeStampB;
        }),
        messagesToShow: [...state.messagesToShow].sort((a, b) => {
          const timeStampA = new Date(a.timestamp);
          const timeStampB = new Date(b.timestamp);
          return timeStampA - timeStampB;
        })
      };

    case ACTION_TYPES.SORT_DESCENDING:
      return {
        ...state,
        sortBy: SORT_ORDER.SORT_DESCENDING,
        messages: [...state.messages].sort((a, b) => {
          const timeStampA = new Date(a.timestamp);
          const timeStampB = new Date(b.timestamp);
          return timeStampB - timeStampA;
        }),
        messagesToShow: [...state.messagesToShow].sort((a, b) => {
          const timeStampA = new Date(a.timestamp);
          const timeStampB = new Date(b.timestamp);
          return timeStampB - timeStampA;
        })
      };

    case ACTION_TYPES.CHANGE_PAGE:
      return {
        ...state,
        activePage: payload,
        messagesToShow: state.messages.slice(
          payload * MAX_BOARDS,
          payload * MAX_BOARDS + MAX_BOARDS
        )
      };

    default:
      return state;
  }
};
