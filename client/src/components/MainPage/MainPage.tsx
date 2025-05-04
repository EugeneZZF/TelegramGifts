import { useEffect, useState } from "react";
import Roulette from "./Roulette/Roulette";
import styles from "./MainPage.module.css";
import clsx from "clsx";
import { getFake_prizes, getPrizes, Prize, PrizeSpin, Spin } from "../services";
import ToggleSwitch from "./ToggleSwitch";
import SliderGifts from "./Roulette/SliderGifts";

type Props = {
  category: number;
  handleCategoryChange: (newCategory: number) => void;
};

const MainPage: React.FC<Props> = ({ category, handleCategoryChange }) => {
  const [prizesList, setPrizesList] = useState<Prize[]>([]);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isBloorActive, setIsBloorActive] = useState(false);
  const [spinValue, setSpinValue] = useState<PrizeSpin[]>([]);

  const handleToggle = () => {
    setIsDemoMode(!isDemoMode);
    if (isDemoMode) {
      handlePrizesListFake(category);
    } else {
      handlePrizesList(category);
    }
  };

  async function handlePrizesList(category: number) {
    console.log("Category:", category);
    const prizes = await getPrizes(category);
    console.log(prizes);

    const formattedPrizes = prizes.map((prize) => ({
      name: prize.name,
      img: prize.name,
      chance_percent: prize.chance_percent,
      price: prize.price,
    }));

    console.log("Formatted Prizes:", formattedPrizes);
    formattedPrizes.sort(() => Math.random() - 0.5);
    setPrizesList(formattedPrizes);
  }

  async function handlePrizesListFake(category: number) {
    // const prizes = await getPrizes(category);
    // console.log(prizes);
    const fake_prizes = getFake_prizes(category);

    const formattedPrizes = fake_prizes.map((prize) => ({
      name: prize.name,
      img: prize.name,
      chance_percent: prize.chance_percent,
      price: prize.price,
    }));
    formattedPrizes.sort(() => Math.random() - 0.5);
    // const pushPrize: Prize = {
    //   name: "test",
    //   img: "test",
    //   chance_percent: "9",
    // };
    // formattedPrizes.push(pushPrize);
    console.log("FAKE Formatted Prizes:", formattedPrizes);

    setPrizesList(formattedPrizes);
  }

  const [startSpin, setStartSpin] = useState(false);
  async function handleSpin() {
    const fake_prizes = getFake_prizes(category);
    let spinValuerF: PrizeSpin[] = [];
    if (!isDemoMode) {
      const spinResult = await Spin(category);

      spinValuerF = [
        {
          name: spinResult.prize,
          is_jackpot: spinResult.is_jackpot,
          img: spinResult.prize,
          price: spinResult.category,
        },
      ];
      handlePrizesList(category);
    } else {
      const randomPrize =
        fake_prizes[Math.floor(Math.random() * fake_prizes.length)];
      spinValuerF = [
        {
          name: randomPrize.name,
          img: randomPrize.name,
          chance_percent: randomPrize.chance_percent,
          price: randomPrize.price,
        },
      ];
      handlePrizesListFake(category);
    }

    console.log("Spin Value:", spinValuerF);
    setSpinValue(spinValuerF);
    console.log("Spin Value:", spinValue);

    setStartSpin(true);
    setTimeout(() => setIsBloorActive(true), 5500);
    setTimeout(() => handleRestartSpnn(), 8000);
  }

  function handleRestartSpnn() {
    setStartSpin(false);
    handlePrizesList(category);
  }

  useEffect(() => {
    handlePrizesList(category);
  }, [category]);

  return (
    <div className={styles.cont}>
      <div
        className={`${styles.bloor_cont} ${
          isBloorActive ? styles.activee : ""
        }`}
      >
        <img className={styles.win_img} src="images/Prizes/prize.png"></img>
        <div className={styles.bloor_title}>
          <h2>Вы выйграли подарок!</h2>
          <p>Демо-режим нужен для тестирования шансов выпадения подарков.</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDemoMode(false);
            setIsBloorActive(false);
          }}
        >
          Отключить демо-режим
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsBloorActive(false);
          }}
        >
          Закрыть
        </button>
      </div>

      <div className={styles.choose_category}>
        <div
          className={clsx(styles.category, {
            [styles.isactive]: category === 25,
          })}
          onClick={() => handleCategoryChange(25)}
        >
          25
          <img className={styles.star} src="images/star.svg" alt="star" />
        </div>
        <div
          className={clsx(styles.category, {
            [styles.isactive]: category === 50,
          })}
          onClick={() => handleCategoryChange(50)}
        >
          50
          <img className={styles.star} src="images/star.svg" alt="star" />
        </div>
        <div
          className={clsx(styles.category, {
            [styles.isactive]: category === 100,
          })}
          onClick={() => handleCategoryChange(100)}
        >
          100
          <img className={styles.star} src="images/star.svg" alt="star" />
        </div>
      </div>
      <Roulette
        category={category}
        prizesList={prizesList}
        startSpin={startSpin}
        spinValue={spinValue}
      ></Roulette>
      <div className={styles.play_cont}>
        <div className={styles.play_title}>
          <p>Демо режим</p>
          <ToggleSwitch
            isChecked={isDemoMode}
            onToggle={handleToggle}
          ></ToggleSwitch>
        </div>
        <button
          className={styles.play_btn}
          onClick={(e) => {
            e.stopPropagation();
            handleSpin();
          }}
        >
          Мне повезет!
        </button>
      </div>
      <div className={styles.canWin_cnt}>
        <div className={styles.canWin_title}>
          <p>Вы можете выиграть</p>
          {/* <img src="images/star.svg" alt="star" /> */}
        </div>
        <div className={styles.canWin_prizes}>
          {/* {prizesList.map((item, index) => (
            <div key={index} className={styles.canWin_item}>
              <img src="images/Prizes/prize.png" alt="Prize" />
              <div className={styles.item_cost}>
                <img src="images/star.svg" alt="star" />
                {item.chance_percent} {item.name}
              </div>
            </div>
          ))} */}
          <SliderGifts prizesList={prizesList}></SliderGifts>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
