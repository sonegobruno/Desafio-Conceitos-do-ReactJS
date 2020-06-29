import React, { useState, useEffect }from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      const repository = response.data;
      setRepositories(repository);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
        title: 'Novo Repositorio',
        url: 'https://github.com/sonegobruno/desafio-conceitos-node-1',
        techs: ["Node JS"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);

    console.log(repositories);
  }

  async function handleRemoveRepository(id) {
    // TODO
    api.delete(`repositories/${id}`);
 
    const newRepositories = repositories.filter(repository => repository.id !== id);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
            <li key={repository.id}>{repository.title} <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
