import React, { useState, useEffect } from 'react';
    import { Button, Input } from '@nextui-org/react';

    const App = () => {
      const [data, setData] = useState([]);
      const [newData, setNewData] = useState('');

      useEffect(() => {
        fetch('/api/data')
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

      const handleAddData = () => {
        fetch('/api/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: newData })
        })
          .then(response => response.json())
          .then(newDoc => setData([...data, newDoc]))
          .catch(error => console.error('Error adding data:', error));
      };

      return (
        <div>
          <h1>Data List</h1>
          <ul>
            {data.map(item => (
              <li key={item._id}>{item.text}</li>
            ))}
          </ul>
          <Input
            value={newData}
            onChange={e => setNewData(e.target.value)}
            placeholder="Enter new data"
          />
          <Button onClick={handleAddData}>Add Data</Button>
        </div>
      );
    };

    export default App;
