import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
    >
      {movie.bannerUrl && (
        <img 
          src={movie.bannerUrl} 
          alt={movie.title}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '4px',
            marginBottom: '10px'
          }}
        />
      )}
      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{movie.title}</h3>
      <p style={{ color: '#666', fontSize: '14px', margin: '0 0 10px 0' }}>
        {movie.review || 'No review available'}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <span style={{ color: '#888', fontSize: '12px' }}>
          Rating: {movie.rating ? `${movie.rating}/10` : 'Not rated'}
        </span>
        {movie.watchLink && (
          <a 
            href={movie.watchLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '12px',
              color: '#007bff',
              textDecoration: 'none'
            }}
          >
            Watch Now
          </a>
        )}
      </div>
      <Link 
        to={`/movie/${movie.id}`}
        style={{
          display: 'inline-block',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      >
        View Details
      </Link>
    </div>
  );
};

export default MovieCard;