import React, { useState, useEffect } from "react";
import api from "services/api";

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Titulo ${repositories.length}`,
      url: `http://titulo${repositories.length}.com.br`,
      techs: [],
    })

    setRepositories([...repositories, response.data])
  
  }

  async function handleRemoveRepository(id) {
    console.log("teste");
    let arr = [...repositories];
    const index = arr.findIndex(el => el.id == id);
    arr.splice(index, 1);
    console.log(`array: ${arr} | index: ${index}`);
    setRepositories([...arr]);
    const response = await api.delete(`repositories/${id}`)

  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(({title, id}) => 
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
      )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
