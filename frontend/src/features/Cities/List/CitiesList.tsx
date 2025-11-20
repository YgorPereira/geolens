import type { City } from "../cities.types";
import styles from "./CitiesList.module.css";

type CityTableProps = {
    data: City[];
    onRowClick?: (city: City) => void;
};

export const CitiesList = ({ data, onRowClick }: CityTableProps) => {
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
                    {data.map((city) => (
                        <tr key={city.id} onClick={() => onRowClick?.(city)} className={styles.row}>
                            <td>{city.name}</td>
                            <td className={styles.center}>{city.population}</td>
                            <td className={styles.center}>{city.latitude}</td>
                            <td className={styles.center}>{city.longitude}</td>
                            <td>{city.country_name ?? "—"}</td>
                            <td className={styles.center}>{city.weather ?? "—"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
