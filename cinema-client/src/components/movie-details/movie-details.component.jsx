import React, { useState } from 'react';
import './movie-details.styles.scss';
import ScheduleSelectorMovie from '../schedule-selector-movie/schedule-selector-movie.component';
import ScheduleMovies from '../schedule-movies/schedule-movies.component';
import FontAwesome from 'react-fontawesome';
import ApiUrlConstants from '../../ApiUrlConstants';
import { getAuthToken } from '../../services/Auth';

const MovieDetails = ({ info, schedule, recommendations, ...props }) => {
  const [favorite, setFavorite] = useState(false);

  const onFavoriteToggle = (movieId) => {
    setFavorite(!favorite);

    if (movieId) {
      fetch(ApiUrlConstants.FAVORITES, {
        method: 'POST',
        body: JSON.stringify({
          movieId: movieId
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthToken(),
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data === 'added') {
            console.log("added")
          } else if (data === 'removed') {
            console.log("removed")
          } else {
            console.log("something went wrong")  
          }
        })
    }
  }

  return (
    <div className="movie">
      <ScheduleSelectorMovie schedule={schedule} {...props} />

      <div className="info">
        <div className="wrapper">
          <div className="poster">
            <img src={info.image} alt={info.name} />

            { // TODO make redux and check signIn state from App.js}
              getAuthToken() ?
                <div className={`favorite ${favorite ? 'active': ''}`} onClick={() => onFavoriteToggle(info.movieId)}>
                  <FontAwesome className="fas" name="heart" title="Add to your favorite list in order to watch it later" />
                </div>
                :
                null
            }

          </div>
          <div className="details">
            <div className="genres">
              {info.genres.map((genre, index) => (
                <div key={index} className="genre">
                  {genre}
                </div>
              ))}
            </div>
            <ul className="detail-values">
              <li className="detail-value">
                <p className="key">Title:</p>
                <p className="value">{info.name}</p>
              </li>
              <li className="detail-value">
                <p className="key">Director:</p>
                <p className="value">{info.director}</p>
              </li>
              <li className="detail-value">
                <p className="key">Release:</p>
                <p className="value">{info.release}</p>
              </li>
              <li className="detail-value">
                <p className="key">Rating IMDB:</p>
                <p className="value">{info.rating}</p>
              </li>
              <li className="detail-value">
                <p className="key">Language:</p>
                <p className="value">{info.language}</p>
              </li>
              <li className="detail-value">
                <p className="key">Genre:</p>
                <p className="value">{info.genres.join(', ')}</p>
              </li>
              <li className="detail-value">
                <p className="key">Duration:</p>
                <p className="value">{info.duration}</p>
              </li>
              <li className="detail-value">
                <p className="key">Production:</p>
                <p className="value">{info.production}</p>
              </li>
              <li className="detail-value">
                <p className="key">Starring</p>
                <p className="value">{info.starring}</p>
              </li>
            </ul>
            <div className="description">{info.description}</div>
          </div>
        </div>
      </div>

      {recommendations.length ? (
        <div className="schedule">
          <div className="wrapper">
            <h2 className="schedule__heading">Watch also</h2>
            <ScheduleMovies movies={recommendations} {...props} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MovieDetails;
