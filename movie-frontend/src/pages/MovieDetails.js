import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieById } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
      fetchMovieById(id)
        .then((res) => setMovie(res.data))
        .catch((err) => {
          console.error('Failed to fetch movie:', err);
          setError(true);
        });
    }, [id]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <p>Release Year: {movie.year}</p>
    </div>
  );
};

export default MovieDetails;
