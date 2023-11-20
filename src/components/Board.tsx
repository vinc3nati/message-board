import React, { useEffect, useState } from "react";
import { MAX_BOARDS, SORT_ORDER } from "../utils/constants";
import { Message } from "./Message";
import { MessageT, useData } from "../context/data-context";

export function Board() {
  const [inputMessage, setInputMessage] = useState("");

  const {
    state: { messages, sortBy, messagesToShow, activePage },
    deleteMessage,
    sortMessage,
    postMessage,
    changeActivePage
  } = useData();

  const inputChangingText = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setInputMessage(() => e.target.value);
  };

  const handleSort = (type: String) => {
    sortMessage(type === SORT_ORDER.SORT_ASCENDING);
  };

  return (
    <section className="p-4 max-w-xl mx-auto">
      <div className="flex gap-2 w-full">
        <input
          className="border border-1 rounded px-2 py-1 w-full"
          type="text"
          value={inputMessage}
          onChange={inputChangingText}
          placeholder="Enter text here"
        />
        <button
          onClick={() => {
            postMessage(inputMessage);
            setInputMessage("");
          }}
          className="rounded px-2 py-1 bg-blue-600 text-white"
        >
          add
        </button>
      </div>
      <select
        onChange={(e) => {
          handleSort(e.target.value);
        }}
        value={sortBy}
        className="border rounded mt-4 px-2 py-1 flex ml-auto text-sm"
      >
        <option disabled>Sort order</option>
        {Object.keys(SORT_ORDER).map((order) => (
          <option key={order} value={order}>
            {order.split("_").join(" ")}
          </option>
        ))}
      </select>
      {messages.length > 5 && (
        <div className="flex w-full justify-between my-4">
          <button
            disabled={activePage === 0}
            className="border bg-blue-600 text-white px-2 py-1 rounded"
            style={{
              opacity: activePage === 0 ? 0.7 : 1,
              cursor: activePage === 0 ? "not-allowed" : "pointer"
            }}
            onClick={() => {
              changeActivePage(activePage - 1);
            }}
            title="previous page"
          >
            {"<"}
          </button>
          <button
            disabled={activePage === Math.floor(messages.length / MAX_BOARDS)}
            className="border bg-blue-600 text-white px-2 py-1 rounded"
            style={{
              opacity:
                activePage === Math.floor(messages.length / MAX_BOARDS)
                  ? 0.7
                  : 1,
              cursor:
                activePage === Math.floor(messages.length / MAX_BOARDS)
                  ? "not-allowed"
                  : "pointer"
            }}
            onClick={() => {
              changeActivePage(activePage + 1);
            }}
            title="next page"
          >
            {">"}
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 my-4">
        {messagesToShow &&
          messagesToShow.map((msg: MessageT) => (
            <Message key={msg.id} message={msg} handleDelete={deleteMessage} />
          ))}
      </div>
    </section>
  );
}
