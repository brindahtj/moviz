import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faVideo, faHeart } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/Movie.module.css';

export default function Movie(props) {    
  const {
    title,
    poster_path,
    overview,
    vote_count,
    vote_average,
    updateLikedMovies,
    isLiked,
  } = props;
  const [personalNote, setPersonalNote] = useState(0);
  const [watchCount, setWatchCount] = useState(0);
  console.log(props);

  const stars = [];

  for (let i = 0; i < 10; i++) {
    let style = {};
    if (i < vote_average - 1) {
      style = { color: '#f1c40f' };
    }
    stars.push(<FontAwesomeIcon key={i} icon={faStar} style={style} />);
  }

  const personalStars = [];
  for (let i = 0; i < 10; i++) {
    let style = {};
    if (i < personalNote) {
      style = { color: 'rgb(116, 116, 238)' };
    }
    personalStars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        style={style}
        onClick={() => setPersonalNote(i + 1)}
      />
    );
  }
  let watchStyle = { cursor: 'pointer' };
  const handleWatch = () => {
    setWatchCount(watchCount + 1);
  };
  if (watchCount > 0) {
    watchStyle = { color: 'red', cursor: 'pointer' };
  }
  let heartStyle = { cursor: 'pointer' };
  const handleHeart = () => {
    updateLikedMovies(title);
  };
  if (isLiked) {
    heartStyle = { color: 'red', cursor: 'pointer' };
  }

  return (
    <div className={styles.card}>
      <img className={styles.image} src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt="Poster" />
      <div className={styles.textContainer}>
        <span className={styles.name}>{title}</span>
        <p className={styles.description}>{overview.length>250? `${overview.substr(0,250)}...`: overview}</p>
        <span className={styles.vote}>
          {stars} ({vote_count})
        </span>
        <div className={styles.vote}>
          {personalStars} ({personalNote})
        </div>
        <div>
          <FontAwesomeIcon
            icon={faVideo}
            onClick={() => handleWatch()}
            style={watchStyle}
          />
          ({watchCount})
        </div>
        <div>
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => handleHeart()}
            style={heartStyle}
          />
        </div>
      </div>
    </div>
  );
}

