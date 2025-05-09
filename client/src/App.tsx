// src/App.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import styles from "./App.module.css";

import Layout from "./components/Layout/Layout";

import MainPage from "./components/MainPage/MainPage";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import MyProfile from "./components/MyProfile/MyProfile";
import { useInitData } from "@tma.js/sdk-react";
// import { useSDK } from "@tma.js/sdk-react";
import { TelegramUser } from "./components/services";

function App() {
  // const initData = useInitData(); // Данные пользователя и сессии

  const user = useInitData()?.user as TelegramUser;

  const [category, setCategory] = useState(25);
  const [languageStatus, setLanguageStatus] = useState(true);
  console.log(user);

  const handleCategoryChange = (newCategory: number) => {
    setCategory(newCategory);
  };
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      id: 0,
      component: (
        <LeaderBoard
          category={category}
          handleCategoryChange={handleCategoryChange}
          languageStatus={languageStatus}
          setLanguageStatus={setLanguageStatus}
        />
      ),
    },
    {
      id: 1,
      component: (
        <MainPage
          category={category}
          handleCategoryChange={handleCategoryChange}
          user={user}
        />
      ),
    },
    { id: 2, component: <MyProfile user={user} /> },
  ];

  function handleSetCurrentScreen(currentScreen: number) {
    setCurrentScreen(currentScreen);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (currentScreen < screens.length - 1) {
        setCurrentScreen((prev) => prev + 1);
      }
    },
    onSwipedRight: () => {
      if (currentScreen > 0) {
        setCurrentScreen((prev) => prev - 1);
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <Layout
      currentScreen={currentScreen}
      handleSetCurrentScreen={handleSetCurrentScreen}
    >
      <div {...handlers} className={styles.App}>
        <div className={styles.sliderContainer}>
          {screens.map((screen, index) => (
            <motion.div
              key={screen.id}
              className={styles.screen}
              initial={{ x: `${(index - currentScreen) * 100}%` }}
              animate={{ x: `${(index - currentScreen) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {screen.component}
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default App;
