import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieById } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieById(id)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error('Failed to fetch movie:', err));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Release Date: {movie.releaseDate}</p>
    </div>
  );
};

export default MovieDetails;
