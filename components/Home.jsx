import 'antd/dist/antd.css';
import styles from '@/styles/Home.module.css';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Popover, Button } from 'antd';
import Movie from './Movie';

export default function Home() {
  const [moviesData,setMovieData]=useState([])
  const [page, setPage] = useState(1)

  useEffect(()=> {fetch(`https://api.themoviedb.org/3/discover/movie?api_key=99a959537352a345ae214a14d1a4c48c&page=${page}`).then((response)=> response.json()).then((data)=>{
    setMovieData(data.results);
    console.log(data);})
  
  }
,[])




  const [likedMovies, setLikedMovies] = useState([]);

  const updateLikedMovies = (movieTitle) => {
    if (likedMovies.find((movie) => movie === movieTitle)) {
      setLikedMovies(likedMovies.filter((el) => el !== movieTitle));
    } else {
      setLikedMovies([...likedMovies, movieTitle]);
    }
  };

  const movies = moviesData.map((movie, i) => {
    const isLiked = likedMovies.some((mov) => mov === movie.title);

    return (

      <Movie
        key={i}
        {...movie}
        updateLikedMovies={updateLikedMovies}
        isLiked={isLiked}
      />
    );
  });

  let popoverMovies = likedMovies.map((movie, i) => {
    return (
      <li key={i}>
        {movie}
        <FontAwesomeIcon
          icon={faCircleXmark}
          onClick={() => updateLikedMovies(movie)}
          className={styles.crossIcon}
        />
      </li>
    );
  });

  const popoverContent = (
    <div className={styles.popoverContent}>{popoverMovies}</div>
  );

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logocontainer}>
          <img src="logo.png" alt="Logo" />
          <img className={styles.logo} src="logoletter.png" alt="Letter logo" />
        </div>
        <Popover
          title="Liked movies"
          content={popoverContent}
          className={styles.popover}
          trigger="click"
        >
          <Button>♥ {likedMovies.length} movie(s)</Button>
        </Popover>
      </div>
      <div className={styles.title}>LAST RELEASES</div>
      <div className={styles.moviesContainer}>{movies}</div>
      <button onClick={() =>setPage(page + 1)}>next</button>
    </div>
  );
}

