import React from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './top-watched-carousel.styles.scss';
import { ReactComponent as RatingIcon } from '../../assets/rating.svg';
import ApiUrls from '../../ApiUrls';

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
    const visibleSlides = 3;

    return (
      <div className="top-watched">
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={0}
          visibleSlides={visibleSlides}
          totalSlides={slides.length}
        >
          <Slider>
            {slides.map((slide, index) => (
              <Slide key={index} index={index} style={{ backgroundImage: `url(${slide.image})` }}>
                <a href={slide.url} className="movie-box">
                  <div className="age-restriction">{slide.restriction}</div>
                  <div className="content">
                    <div className="name">{slide.name}</div>
                    <div className="rating">
                      <RatingIcon className="rating-icon" /> {slide.rating} IMDB
                    </div>
                  </div>
                </a>
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </div>
    );
  }
}

export default TopWatchedCarousel;
