import React from "react";
import styles from "./Layout.module.css";

type Props = {
  children: React.ReactNode;
  currentScreen: number;
  handleSetCurrentScreen: (currentScreen: number) => void;
};

export default function Layout({
  children,
  currentScreen,
  handleSetCurrentScreen,
}: Props) {
  console.log("Children:", children);
  return (
    <div className={styles.layout}>
      <header>
        <div className={styles.close_btn}>Закрыть</div>
        <div className={styles.title}>
          <h1>Application</h1>
          <p>Мини-приложение</p>
        </div>
        <img
          className={styles.settings_btn}
          src="images/settings_btn.svg"
        ></img>
      </header>
      <main>{children}</main>
      <footer>
        <div
          className={`${styles.children_cont} ${
            currentScreen === 0 ? styles.active : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleSetCurrentScreen(0);
          }}
        >
          {currentScreen === 0 ? (
            <img src="images/children/children_0_0.svg"></img>
          ) : (
            <img src="images/children/children_0_.svg"></img>
          )}
          Лидеры
        </div>
        <div
          className={`${styles.children_cont} ${
            currentScreen === 1 ? styles.active : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleSetCurrentScreen(1);
          }}
        >
          {currentScreen === 1 ? (
            <img src="images/children/children_1_1.svg"></img>
          ) : (
            <img src="images/children/children_1_.svg"></img>
          )}
          Играть
        </div>
        <div
          className={`${styles.children_cont} ${
            currentScreen === 2 ? styles.active : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            handleSetCurrentScreen(2);
          }}
        >
          {currentScreen === 2 ? (
            <img src="images/children/children_2_2.svg"></img>
          ) : (
            <img src="images/children/children_2_.svg"></img>
          )}
          Профиль
        </div>
      </footer>
    </div>
  );
}
