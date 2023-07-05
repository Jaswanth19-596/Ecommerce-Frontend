import { Carousel } from 'antd';
import './Carousel.css';

const MyCarousel = (props) => {
  return (
    <Carousel autoplay>
      {props.images.map((image) => (
        <div className="image-container" key={image}>
          <img src={image} alt="image1" className="image" />
        </div>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
