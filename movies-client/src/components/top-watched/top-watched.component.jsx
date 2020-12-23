import React from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './top-watched.styles.scss';
import { ReactComponent as RatingIcon } from '../../assets/rating.svg';

class TopWatched extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      slides: []
    };
  }

  componentDidMount() {
    const slides = [
      {
        image: 'https://image.tmdb.org/t/p/w500/QtSxEuCwcZSfCTMZfER3nHDVsG.jpg',
        name: 'Movie name',
        restriction: '18+',
        rating: '6.9',
        url: '#'
      },
      {
        image: 'https://image.tmdb.org/t/p/w500/QtSxEuCwcZSfCTMZfER3nHDVsG.jpg',
        name: 'Movie name',
        restriction: '18+',
        rating: '6.9',
        url: '#'
      },
      {
        image: 'https://image.tmdb.org/t/p/w500/QtSxEuCwcZSfCTMZfER3nHDVsG.jpg',
        name: 'Movie name',
        restriction: '18+',
        rating: '6.9',
        url: '#'
      },
      {
        image: 'https://image.tmdb.org/t/p/w500/QtSxEuCwcZSfCTMZfER3nHDVsG.jpg',
        name: 'Movie name',
        restriction: '18+',
        rating: '6.9',
        url: '#'
      }
    ];

    this.setState({ slides: slides });
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
              <Slide
                key={index}
                index={index}
                style={{ backgroundImage: `url(${slide.image})` }}>
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

export default TopWatched;
