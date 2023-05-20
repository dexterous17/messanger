import { Card, InputGroup } from '@blueprintjs/core';
import React, { useState } from 'react';

function RecipientList({ onDataChange, recipientlist }) {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRecipients = recipientlist?.filter(
    (recipient) =>
      recipient?.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleChildDataChange = (data) => {
    onDataChange(data);
  };

  return (
    <Card className="recipient-list" style={{ padding: '5px', width: '250px' }}>
      <div className="search-bar">
        <InputGroup
          style={{ padding: '10px' }}
          placeholder="Search recipients"
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </div>
      <div>
        <div className="recipient-list-items" style={{ marginTop: '10px' }}>
          {filteredRecipients?.map((recipient) => (
            <Card
              key={recipient?.id}
              className="recipient-list-item"
              interactive={true}
              onClick={() => handleChildDataChange(recipient)}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '25px',
                }}
              >
                {recipient?.name}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default RecipientList;
