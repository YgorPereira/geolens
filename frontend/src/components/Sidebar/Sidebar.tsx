import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faFlag, faEarthAmericas, faHome } from "@fortawesome/free-solid-svg-icons";

import styles from './Sidebar.module.css'
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <nav className={styles.main_container}>
            <section className={styles.logo_section}>
                <h1>GeoLens</h1>
            </section>

            <section className={styles.top_buttons}>
                <div className={styles.section_button}>
                    <FontAwesomeIcon icon={faHome} />
                    <span className={styles.button_label}>Homepage</span>
                </div>

                <div className={styles.section_button} onClick={() => navigate('/cidades')}>
                    <FontAwesomeIcon icon={faCity} />
                    <span className={styles.button_label}>Cidades</span>
                </div>

                <div className={styles.section_button} onClick={() => navigate('/paises')}>
                    <FontAwesomeIcon icon={faFlag} />
                    <span className={styles.button_label}>Paises</span>
                </div>

                <div className={styles.section_button} onClick={() => navigate('/continentes')}>
                    <FontAwesomeIcon icon={faEarthAmericas} />
                    <span className={styles.button_label}>Continentes</span>
                </div>
            </section>

            <section className={styles.bottom_buttons}>
            </section>
        </nav>
    );
};