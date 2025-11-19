import { Layout } from "../../components/Layout/Layout";
import { CountriesList } from "./CountriesList";
import { countries } from "./countries.types";
import { Pagination } from "../../components/Pagination/Pagination";
import { useState, useMemo } from "react";
import styles from "./CountriesPage.module.css";
import { Button } from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../components/SearchBar/SearchBar";

export const CountriesPage = () => {
    const itemsPerPage = 13;
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const filteredCountries = useMemo(() => {
        return countries.filter(country =>
            country.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const totalItems = filteredCountries.length;

    const start = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredCountries.slice(start, start + itemsPerPage);

    return (
        <Layout>
            <section className={styles.tableSection}>
                <section className={styles.tableButtonsSection}>
                    <span className={styles.table_title}>Países</span>

                    <div className={styles.searchWrapper}>
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            placeholder="Buscar país..."
                        />
                    </div>

                    <div className={styles.buttons}>
                        <Button>Novo País</Button>
                        <Button variant="card" icon={<FontAwesomeIcon icon={faFilter} />}>
                            Filtros
                        </Button>
                    </div>
                </section>

                <section className={styles.tableWrapper}>
                    <CountriesList data={currentItems} />
                </section>

                <div className={styles.paginationFixed}>
                    <Pagination
                        currentPage={currentPage}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </section>
        </Layout>
    );
};
