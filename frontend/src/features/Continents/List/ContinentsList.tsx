import type { Continent } from "../continents.types";
import styles from "./ContinentsList.module.css";

type ContinentTableProps = {
    data: Continent[];
    onRowClick: (item: Continent) => void;
};

export const ContinentsList = ({ data, onRowClick }: ContinentTableProps) => {
    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th className={styles.colCount}>Qtd. Países</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} onClick={() => onRowClick(item)} className={styles.row}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td className={styles.colCount}>{item.count_paises ?? "—"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
