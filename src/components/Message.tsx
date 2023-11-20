import React, { useEffect } from "react";
import { MessageT } from "../context/data-context";

export function Message({
  message,
  handleDelete
}: {
  message: MessageT;
  handleDelete: (id: number) => Promise<void>;
}) {
  const { id, source: username, text } = message;

  return (
    <main className="flex flex-col gap-1 px-2 py-1 border rounded border-1">
      <div className="flex w-full justify-between">
        <h3>{username}</h3>
        <button
          className="rounded px-2 py-1 bg-red-600 text-white"
          onClick={() => {
            handleDelete(id);
          }}
        >
          delete
        </button>
      </div>
      <p
        className="font-bold white"
        style={{
          maxWidth: "90%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis"
        }}
        title={text}
      >
        {text}
      </p>
    </main>
  );
}
