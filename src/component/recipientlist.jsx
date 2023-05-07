import { Card } from '@blueprintjs/core';
import React, { useState } from 'react';

function RecipientList({ onDataChange, recipientlist }) {
  const [searchText, setSearchText] = useState('');
  const handleSearchTextChange = event => {
    setSearchText(event.target.value);
  };

  const filteredRecipients = recipientlist?.filter(
    recipientlist => recipientlist?.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleChildDataChange = (data) => {
    onDataChange(data);
  };

  return (
    <Card className="recipient-list">
      <div className="search-bar">
        <input type="text" placeholder="Search recipients" value={searchText} onChange={handleSearchTextChange} />
      </div>
      <div className="recipient-list-items">
        {filteredRecipients?.map(recipientlist => (
          <Card style={{
            height: '25px', display: "flex",
            margin: "5px", alignItems: "center"
          }} key={recipientlist?.id} className="recipient-list-item" onClick={() => handleChildDataChange(recipientlist)}>
            {
              recipientlist?.name
            }
          </Card>
        ))}
      </div>
    </Card>
  );
}

export default RecipientList;
