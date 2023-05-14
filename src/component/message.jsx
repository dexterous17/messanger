import React, { useState } from "react";
import { Card, Elevation } from "@blueprintjs/core";
import MainMessage from "./mainMessage";

function Message({ message, recipient }) {
  const [openPopoverIndex, setOpenPopoverIndex] = useState(null);

  const handleOpenPopover = (index) => {
    setOpenPopoverIndex(index);
  };

  const handleClosePopover = () => {
    setOpenPopoverIndex(null);
  };

  const handleCloseAllPopovers = () => {
    setOpenPopoverIndex(null);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column" ,height: '100px'}}
      onClick={handleCloseAllPopovers}
    >
      {message?.map((item, index) => {
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
              isOpen={index === openPopoverIndex}
              onOpenPopover={() => handleOpenPopover(index)}
              onClosePopover={handleClosePopover}
            />
          </Card>
        );
      })}
    </div>
  );
}

export default Message;
