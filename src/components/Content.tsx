import { MovieCard } from '../components/MovieCard';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import '../styles/content.scss';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}
interface Genre {
  genderId: number;
  gender: GenreResponseProps
}

export function Content({genderId, gender}: Genre){
  // Complete aqui
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${genderId}`).then(response => {
      setMovies(response.data);
    });
  }, [genderId]);
  
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {gender.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}