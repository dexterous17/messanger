import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
import MainMessage from "./mainMessage";

function Message({ message, recipient }) {
  
  return (
    <div
      style={{ display: "flex", flexDirection: "column", height: '100px' }}
    >
      {message?.map((item) => {
        const isSenderRecipient = item.sender_id === recipient.id;

        return (
          <Card
            className={isSenderRecipient ? "start" : "end"}
            key={item.id}
            elevation={Elevation.TWO}
            style={{
              padding: "7px",
              margin: "5px"
            }}
          >
            <MainMessage
              item={item}
            />
          </Card>
        );
      })}
    </div>
  );
}

export default Message;
