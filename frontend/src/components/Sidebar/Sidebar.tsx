import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faFlag, faEarthAmericas, faHome, faCompass, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import styles from './Sidebar.module.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const Sidebar = () => {
    const navigate = useNavigate();

    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <nav className={styles.main_container}>
            <section className={styles.top_buttons}>
                <div className={styles.logo_section}>
                    <FontAwesomeIcon icon={faCompass} />
                    <h1>GeoLens</h1>
                </div>

                <div className={styles.section_button} onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faHome} />
                    <span className={styles.button_label}>Homepage</span>
                </div>

                <div className={styles.section_button} onClick={() => navigate('/cidades')}>
                    <FontAwesomeIcon icon={faCity} />
                    <span className={styles.button_label}>Cidades</span>
                </div>

                <div className={styles.section_button} onClick={() => navigate('/paises')}>
                    <FontAwesomeIcon icon={faFlag} />
                    <span className={styles.button_label}>Países</span>
                </div>

                <div className={styles.section_button} onClick={() => navigate('/continentes')}>
                    <FontAwesomeIcon icon={faEarthAmericas} />
                    <span className={styles.button_label}>Continentes</span>
                </div>
            </section>

            <section className={styles.bottom_buttons} onClick={toggleTheme}>
                <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
                <span className={styles.button_label}>
                    {theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
                </span>
            </section>
        </nav>
    );
};
