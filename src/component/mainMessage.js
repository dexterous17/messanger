import React from "react";
import { Icon, Menu } from "@blueprintjs/core";
import { Popover2, MenuItem2 } from "@blueprintjs/popover2";

function MainMessage({ item, isOpen, onOpenPopover, onClosePopover }) {
  return (
    <div>
      {item.message}
      <Popover2
        isOpen={isOpen}
        onOpening={onOpenPopover}
        onClosing={onClosePopover}
        content={
          <Menu>
            <MenuItem2 text="Edit" icon="edit" />
            <MenuItem2 text="Delete" icon="delete" />
          </Menu>
        }
      >
        <Icon
          icon="more"
          iconSize={16}
          style={{ marginLeft: "10px", cursor: "pointer" }}
          onClick={(event) => {
            event.stopPropagation();
            onOpenPopover();
          }}
        />
      </Popover2>
    </div>
  );
}

export default MainMessage;
