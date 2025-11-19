import { Layout } from "../../components/Layout/Layout";
import { CitiesList } from "./CitiesList";
import { cities } from "./cities.types";
import { Pagination } from "../../components/Pagination/Pagination";
import { useState, useMemo } from "react";
import styles from "./CitiesPage.module.css";
import { Button } from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../components/SearchBar/SearchBar";

export const CitiesPage = () => {
    const itemsPerPage = 13;
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const filteredCities = useMemo(() => {
        return cities.filter(city =>
            city.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const totalItems = filteredCities.length;

    const start = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredCities.slice(start, start + itemsPerPage);

    return (
        <Layout>
            <section className={styles.tableSection}>
                <section className={styles.tableButtonsSection}>
                    <span className={styles.table_title}>Cidades</span>

                    <div className={styles.searchWrapper}>
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            placeholder="Buscar cidade..."
                        />
                    </div>

                    <div className={styles.buttons}>
                        <Button>Nova Cidade</Button>
                        <Button variant="card" icon={<FontAwesomeIcon icon={faFilter} />}>
                            Filtros
                        </Button>
                    </div>
                </section>

                <section className={styles.tableWrapper}>
                    <CitiesList data={currentItems} />
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
