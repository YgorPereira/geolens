import { Layout } from "../../components/Layout/Layout"
import { ContinentsList } from "./ContinentsList"
import { continents } from "./continents.types"
import { Pagination } from "../../components/Pagination/Pagination"
import { useState } from "react"
import styles from './ContinentsPage.module.css'

export const ContinentsPage = () => {
    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = continents.length;

    const start = (currentPage - 1) * itemsPerPage;
    const currentItems = continents.slice(start, start + itemsPerPage);

    return (
        <Layout>
            <section className={styles.tableSection}>
                <ContinentsList data={currentItems} />

                <Pagination
                    currentPage={currentPage}
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </section>
        </Layout>
    );
};
