import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState
} from "react";
import { fetchHelper } from "../utils/apiHelper";
import { ACTION_TYPES, BASE_API } from "../utils/constants";
import { initState, reducer } from "../reducer/dataReducer";

export type MessageT = {
  id: number;
  text: string;
  source: string;
  timestamp: string;
};

export type DataT = {
  state: {
    messages: MessageT[];
    messagesToShow: MessageT[];
    activePage: number;
    sortBy: string;
  };
  deleteMessage: (id: number) => Promise<void>;
  postMessage: (text: string) => Promise<void>;
  sortMessage: (isAscending: boolean) => void;
  changeActivePage: (pageNumber: number) => void;
};

const DataContext = createContext<DataT | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const fetchMessages = async () => {
    const res = await fetchHelper(`${BASE_API}/v1/messages/`);

    if (res) {
      dispatch({ type: ACTION_TYPES.INITIALIZE_MESSAGE, payload: res });
    }
  };

  const deleteMessage = async (id: number) => {
    await fetchHelper(`${BASE_API}/v1/messages/${id}/`, {
      method: "DELETE"
    });

    dispatch({ type: ACTION_TYPES.DELETE_MESSAGE, payload: id });
  };

  const postMessage = async (text: string) => {
    const res = await fetchHelper(`${BASE_API}/v1/messages/`, {
      method: "POST",
      body: JSON.stringify({
        text
      })
    });
    if (res) {
      dispatch({ type: ACTION_TYPES.ADD_MESSAGE, payload: res });
    }
  };

  const sortMessage = (isAscending: boolean) => {
    if (isAscending) dispatch({ type: ACTION_TYPES.SORT_ASCENDING });
    else dispatch({ type: ACTION_TYPES.SORT_DESCENDING });
  };

  const changeActivePage = (pageNumber: number) => {
    dispatch({
      type: ACTION_TYPES.CHANGE_PAGE,
      payload: pageNumber
    });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <DataContext.Provider
      value={{
        state,
        deleteMessage,
        postMessage,
        sortMessage,
        changeActivePage
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataT => {
  const context = useContext(DataContext);
  if (!context) throw new Error("Data context was not created");

  return context;
};
