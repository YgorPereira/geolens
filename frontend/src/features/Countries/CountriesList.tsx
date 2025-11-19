import type { Country } from "./countries.types";
import styles from "./CountriesList.module.css";

type CountryTableProps = {
    data: Country[];
};

export const CountriesList = ({ data }: CountryTableProps) => {
    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.colName}>Nome</th>
                        <th className={styles.colPopulation}>População</th>
                        <th className={styles.colLanguage}>Idioma</th>
                        <th className={styles.colCoin}>Moeda</th>
                        <th className={styles.colContinent}>Continente</th>
                        <th className={styles.colCityQuantity}>Cidades</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td className={styles.center}>{item.population}</td>
                            <td>{item.language}</td>
                            <td>{item.coin}</td>
                            <td>{item.continent_name}</td>
                            <td className={styles.center}>{item.city_quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
