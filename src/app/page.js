import "bulma/css/bulma.min.css";
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import Image from "next/image";
import styles from "./page.module.css";
import VideoPlayer from "./components/VideoPlayer";

export default function Home() {
  return (
    <main className={styles.main}>
      <VideoPlayer />
    </main>
  );
}
