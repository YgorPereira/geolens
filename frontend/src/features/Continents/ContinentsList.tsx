import type { Continent } from "./continents.types";
import styles from "./ContinentsList.module.css";

type ContinentTableProps = {
    data: Continent[];
};

export const ContinentsList = ({ data }: ContinentTableProps) => {
    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.colName}>Nome</th>
                        <th className={styles.colDescription}>Descrição</th>
                        <th className={styles.colCount}>Quantidade de países</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
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
