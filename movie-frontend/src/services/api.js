import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/movies';

export const fetchMovies = () => axios.get(BASE_URL);
export const fetchMovieById = (id) => axios.get(`${BASE_URL}/${id}`);
export const addMovie = (movie) => axios.post(BASE_URL, movie);
export const deleteMovie = (id) => axios.delete(`${BASE_URL}/${id}`);
