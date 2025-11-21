import { Layout } from "../../components/Layout/Layout";
import styles from "./Home.module.css";
import backgroundVideo from '../../assets/videos/home_background.mp4';

export const Home = () => {
    return (
        <Layout>
            <div className={styles.hero}>
                <video className={styles.video_bg} autoPlay muted loop>
                    <source src={backgroundVideo} type="video/mp4" />
                </video>

                <div className={styles.overlay}></div>

                <div className={styles.content}>
                    <h1 className={styles.title}>GeoLens</h1>
                    <p className={styles.slogan}>Explore o mundo com precisão</p>
                </div>
            </div>
        </Layout>
    );
};
