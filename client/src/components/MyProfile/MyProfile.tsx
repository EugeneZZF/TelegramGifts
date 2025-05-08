import styles from "./MyProfile.module.css";
import { useEffect, useState } from "react";
import { getHistory, TelegramUser } from "../services";
type Props = {
  user: TelegramUser;
};

const MyProfile: React.FC<Props> = ({ user }) => {
  const [starsCnt, setStarsCnt] = useState<number>(0);
  const [isHistory, setIsHistory] = useState<boolean>(false);
  const [history, setHistory] = useState<any[]>([]);

  async function handleGetHystory() {
    const history = await getHistory(user.username);
    console.log(history);

    if (history.length === 0) {
      setIsHistory(false);
    } else {
      setIsHistory(true);
      setHistory(history);
    }
  }

  useEffect(() => {
    handleGetHystory();
  }, []);

  return (
    <div className={styles.myProfile}>
      <div className={styles.profile_cnt}>
        <div
          className={styles.avatar_cnt}
          style={{ background: `url(${user.photoUrl})` }}
        ></div>
        <h1 className={styles.profile_name}>Павел Герасимов</h1>
        <div className={styles.star_cnt}>
          У вас есть {starsCnt} <img src="images/star.svg" /> звезд
        </div>
      </div>
      {!isHistory ? (
        <div className={styles.historyEmpty_cnt}>
          <img src="images/profile/papka.svg"></img>
          <p>Нет нераспределённых подарков</p>
        </div>
      ) : (
        <div className={styles.history_cnt}>
          {history.map((item, index) => {
            return (
              <div key={index} className={styles.history_item}>
                <div className={styles.left_item_side}>
                  <div className={styles.left_item_side_stars_cont}>
                    <p>{item.category}</p>
                    <img src="images/star.svg" />
                  </div>
                </div>
                <div className={styles.right_item_side_button_cont}>
                  {item.emoji}
                  <button className={styles.right_item_side_button}>
                    <img src="images/star.svg" />
                    <p>{item.category}</p>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
