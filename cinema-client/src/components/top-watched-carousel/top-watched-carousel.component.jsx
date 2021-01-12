import React from 'react';
import { Link } from 'react-router-dom';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './top-watched-carousel.styles.scss';
import { ReactComponent as RatingIcon } from '../../assets/rating.svg';
import ApiUrls from '../../ApiUrlConstants';
import AppUrls from '../../AppUrlContants';

const VISIBLE_SLIDES = 3;
const NATURAL_SLIDE_WIDTH = 100;
const NATURAL_SLIDE_HEIGHT = 0;
const RATING_PREFIX = 'IMDB';

class TopWatchedCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slides: []
    };
  }

  componentDidMount() {
    fetch(ApiUrls.TOP_WATCHED_CAROUSEL)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ slides: data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const slides = this.state.slides;

    return (
      <div className="top-watched">
        <CarouselProvider
          naturalSlideWidth={NATURAL_SLIDE_WIDTH}
          naturalSlideHeight={NATURAL_SLIDE_HEIGHT}
          visibleSlides={VISIBLE_SLIDES}
          totalSlides={slides.length}
        >
          <Slider>
            {slides.map((slide, index) => (
              <Slide key={index} index={index} style={{ backgroundImage: `url(${slide.image})` }}>
                <Link to={AppUrls.getMovieUrl(slide.movieId)} className="movie-box">
                  <div className="content">
                    <div className="name">{slide.name}</div>
                    <div className="rating">
                      <RatingIcon className="rating-icon" /> {slide.rating} {RATING_PREFIX}
                    </div>
                  </div>
                </Link>
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </div>
    );
  }
}

export default TopWatchedCarousel;
