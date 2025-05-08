import React, { useEffect, useState } from "react";
import styles from "./LeaderBoard.module.css";
import "./LeaderBoard_SVG.css";
import clsx from "clsx";
import { getUsers } from "../services";

type Props = {
  category: number;
  handleCategoryChange: (newCategory: number) => void;
  languageStatus: boolean;
  setLanguageStatus: (status: boolean) => void;
};

const LeaderBoard: React.FC<Props> = ({
  category,
  handleCategoryChange,
  languageStatus,
  setLanguageStatus,
}) => {
  const [usersList, setUsersList] = useState<any[]>([]);

  async function handleUsersList(category: number) {
    const users = await getUsers(category);
    console.log(users);

    const formattedUsers = users
      .map((user) => ({
        telegram_name: user.telegram_name,
        spins: user.spins,
        jackpots: user.jackpots,
        spent_units: user.spent_units,
      }))
      .sort((a, b) => b.jackpots - a.jackpots);
    setUsersList(formattedUsers);
  }

  useEffect(() => {
    handleUsersList(category);
  }, [category]);

  return (
    <div className={styles.leaderboard_cnt}>
      <div className={styles.top}>
        <div className={styles.top_first_line}>
          <div
            className={styles.container_switcher}
            onClick={() => setLanguageStatus(!languageStatus)}
          >
            <div
              className={clsx(styles.container_switcher_language, {
                [styles.active]: !languageStatus,
              })}
            >
              {languageStatus ? "RU" : "EN"}
            </div>
            <img
              src="images/leader/global.svg"
              alt="Global Icon"
              className={clsx(styles.global_icon, {
                [styles.active]: !languageStatus,
              })}
            ></img>
          </div>
          <div className={styles.kubok}>🏆</div>
          <div
            className={styles.container_switcher}
            onClick={() => setLanguageStatus(!languageStatus)}
          >
            <img
              className={clsx(styles.mask, {
                [styles.active]: !languageStatus,
              })}
              src="images/leader/mask.svg"
            ></img>
            <div
              className={clsx(styles.container_switcher_language, {
                [styles.active]: !languageStatus,
              })}
            ></div>
            <img
              src="images/leader/smile.svg"
              alt="Global Icon"
              className={clsx(styles.smile, {
                [styles.active]: !languageStatus,
              })}
            ></img>
          </div>
        </div>
        <div className={styles.top_title}>
          <h1>Таблица лидеров</h1>
          <p>Здесь вы можете увидеть самых везучих игроков</p>
        </div>
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
      <div className={styles.leader_cnt}>
        {usersList.length > 0
          ? usersList.map((user, index) => (
              <div className={styles.leader} key={index}>
                <div className={styles.leader_cont}>
                  <div className={styles.avatar}></div>
                  <div className={styles.user_title}>
                    <div className={styles.user_name}>
                      @{user.telegram_name}
                    </div>
                    <div className={styles.user_stats}>
                      <div className={styles.user_stat_cnt}>
                        {user.spins} игр {"· "}
                      </div>
                      <div className={styles.user_stat_cnt}>
                        {user.spent_units} звезд {"· "}
                      </div>
                      <div className={styles.user_stat_cnt}>
                        {user.jackpots} джекпота
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.user_line}></div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default LeaderBoard;
