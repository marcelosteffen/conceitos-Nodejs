const express = require("express");
const { uuid } =  require("uuidv4");
const cors = require("cors");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url, 
    techs,
    likes: 0
  }

  repositories.push(repository);

  response.status(200).json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0){
    return response.status(400).json({ error: "Repository not found!"});
  }

  repositories[repositoryIndex].title = title;
  repositories[repositoryIndex].url = url;
  repositories[repositoryIndex].techs = techs;

  return response.status(200).json(repositories[repositoryIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0){
    return response.status(400).json({ error: "Repository not found!"});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();


});

app.post("/repositories/:id/like", (request, response) => {
  const { likes} = request.body;
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if (repositoryIndex < 0){
    return response.status(400).json({ error: "Repository not found!"});
  }

  repositories[repositoryIndex].likes++;

  return response.status(200).json(repositories[repositoryIndex]); 
});

module.exports = app;
