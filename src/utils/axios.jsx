import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjE0OWE5YmNkMTYyNzg5MGYwZmNhMTQ2MDE5YjZjZiIsIm5iZiI6MTcyMTgwMjI1MC41Mzk2OTIsInN1YiI6IjY2YTA5YzVlYjEwZjBhM2UyZTA5ZGM2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uahvrYbOuIVXzMnAsXa_J64JC5dcTj7MSyHzbB8ChLo",
  },
});

export default instance;
