import styles from "./Roulette.module.css";

import { Prize, PrizeSpin } from "../../services";

type Props = {
  category: number;
  prizesList: Prize[];
  startSpin: boolean;
  spinValue: PrizeSpin[];
};

export default function Roulette({
  category,
  prizesList,
  startSpin,
  spinValue,
}: Props) {
  return (
    <div className={styles.cont}>
      <div className={styles.shadow_left}></div>
      <div className={styles.roulette_arrow}>
        <img
          className={styles.arrow_roulette}
          src="images/arrow_roulette.svg"
          alt="arrow"
        />
      </div>
      <div className={styles.roulette_cont}>
        <div
          className={`${styles.roulette_track} ${
            startSpin ? styles.start : ""
          }`}
          style={
            startSpin && prizesList.length % 2 === 0
              ? { marginLeft: `-${(prizesList.length - 1) * 10.8125 + 4.5}rem` }
              : startSpin && prizesList.length % 2 != 0
              ? { marginLeft: `-${(prizesList.length - 1) * 10.8125 + 4.5}rem` }
              : { transition: "none", marginLeft: "-4.3rem" }
          }
        >
          {prizesList.map((item, index) => (
            <div key={index} className={styles.item}>
              {/* <img src="images/Prizes/prize.png" alt="Prize" />
               */}
              🏆
              <div className={styles.item_cost}>
                <img src="images/star.svg" alt="star" />
                {item.price}
              </div>
            </div>
          ))}
          {spinValue.length !== 0 ? (
            <div className={styles.item}>
              <img src="images/Prizes/prize.png" alt="Prize" />
              <div className={styles.item_cost}>
                <img src="images/star.svg" alt="star" />
                {spinValue[0].price}
              </div>
            </div>
          ) : null}
          {prizesList.map((item, index) => (
            <div key={index} className={styles.item}>
              {/* <img src="images/Prizes/prize.png" alt="Prize" />
               */}
              🏆
              <div className={styles.item_cost}>
                <img src="images/star.svg" alt="star" />
                100 {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.shadow_right}></div>
    </div>
  );
}
