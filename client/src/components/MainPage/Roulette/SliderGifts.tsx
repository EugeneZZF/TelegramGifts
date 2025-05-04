import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Prize } from "../../services";
import styles from "./SliderGifts.module.css";

type Props = { prizesList: Prize[] };

export default function SliderGifts({ prizesList }: Props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {prizesList.map((item, index) => (
          <div key={index} className={styles.sliderItem}>
            <div className={styles.item}>
              <div className={styles.chance_percent}>
                {item.chance_percent}%
              </div>
              <div className={styles.emoji}>💝</div>
              <div className={styles.cont_price}>⭐{item.price}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
