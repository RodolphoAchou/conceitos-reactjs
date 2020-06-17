import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [respositories, setRespositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then( response => {
      setRespositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: "https://github.com/RodolphoAchou/conceitos-reactjs",
      techs: ["Node", "Express", "TypeScript"],
    });

    setRespositories([...respositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete('repositories/' + id)
    setRespositories(respositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map( repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
