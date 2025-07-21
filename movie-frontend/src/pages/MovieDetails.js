import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
          setError('Failed to load movie details. Please make sure the backend server is running.');
        });
    }, [id]);

  if (error) return (
    <div style={{ padding: '20px' }}>
      <p style={{ color: 'red' }}>{error}</p>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>← Back to Movies</Link>
    </div>
  );
  
  if (!movie) return (
    <div style={{ padding: '20px' }}>
      <p>Loading...</p>
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
        ← Back to Movies
      </Link>
      
      {movie.bannerUrl && (
        <img 
          src={movie.bannerUrl} 
          alt={movie.title}
          style={{
            width: '100%',
            maxHeight: '400px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '20px'
          }}
        />
      )}
      
      <h1 style={{ marginBottom: '20px' }}>{movie.title}</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Rating:</strong> {movie.rating ? `${movie.rating}/10` : 'Not rated'}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Review:</strong>
        <p style={{ marginTop: '10px', lineHeight: '1.6' }}>
          {movie.review || 'No review available'}
        </p>
      </div>
      
      {movie.watchLink && (
        <div style={{ marginTop: '30px' }}>
          <a 
            href={movie.watchLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          >
            Watch Now
          </a>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
