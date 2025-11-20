import { Layout } from "../../../components/Layout/Layout";
import { CitiesList } from "../List/CitiesList";
import { Pagination } from "../../../components/Pagination/Pagination";
import { useState, useMemo } from "react";
import styles from "./CitiesPage.module.css";
import { Button } from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Modal } from "../../../components/Modal/Modal";
import { CityForm } from "../Forms/CitiesForm";

import type { City } from "../cities.types";
import { useCities } from "../../../hooks/useCities";
import { useCountries } from "../../../hooks/useCountries";

export const CitiesPage = () => {
    const itemsPerPage = 8;

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "view" | "edit">("view");
    const [selected, setSelected] = useState<City | null>(null);

    const {
        cities,
        removeCity
    } = useCities();

    const {
        countries,
    } = useCountries();

    const filteredCities = useMemo(() => {
        if (!cities) return;

        return cities.filter((city) =>
            city.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, cities]);

    const totalItems = filteredCities.length;
    const start = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredCities.slice(start, start + itemsPerPage);

    function openCreate() {
        setSelected(null);
        setFormMode("create");
        setModalOpen(true);
    }

    function openView(city: City) {
        setSelected(city);
        setFormMode("view");
        setModalOpen(true);
    }

    function handleEdit() {
        setFormMode("edit");
    }

    function closeModal() {
        setModalOpen(false);
        setSelected(null);
        setFormMode("view");
    }

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
                        <Button onClick={openCreate}>Nova Cidade</Button>
                        <Button variant="card" icon={<FontAwesomeIcon icon={faFilter} />}>
                            Filtros
                        </Button>
                    </div>
                </section>

                <section className={styles.tableWrapper}>
                    <CitiesList
                        data={currentItems}
                        onRowClick={openView}
                    />
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

            <Modal isOpen={modalOpen} onClose={closeModal} title="Dados da Cidade">
                <CityForm
                    mode={formMode}
                    defaultValues={
                        selected
                            ? {
                                id: selected.id,
                                name: selected.name,
                                population: selected.population,
                                latitude: selected.latitude,
                                longitude: selected.longitude,
                                country_id: selected.country_id || 0,
                                country_name: selected.country_name,
                                weather: selected.weather,
                            }
                            : undefined
                    }
                    countries={countries}
                    onSubmit={(data) => {
                        console.log("SUBMIT", formMode, data);
                        closeModal();
                    }}
                    onCancel={closeModal}
                    onDelete={removeCity}
                    onStartEdit={handleEdit}
                />
            </Modal>
        </Layout>
    );
};
