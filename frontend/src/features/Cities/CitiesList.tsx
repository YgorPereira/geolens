import type { City } from "./cities.types";
import styles from "./CitiesList.module.css";

type CityTableProps = {
    data: City[];
};

export const CitiesList = ({ data }: CityTableProps) => {
    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.colName}>Nome</th>
                        <th className={styles.colPopulation}>População</th>
                        <th className={styles.colLat}>Latitude</th>
                        <th className={styles.colLon}>Longitude</th>
                        <th className={styles.colCountry}>País</th>
                        <th className={styles.colWeather}>Clima</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td className={styles.center}>{item.population}</td>
                            <td className={styles.center}>{item.latitude}</td>
                            <td className={styles.center}>{item.longitude}</td>
                            <td>{item.country_name ?? "—"}</td>
                            <td className={styles.center}>{item.weather ?? "—"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
