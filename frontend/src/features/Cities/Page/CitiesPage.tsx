import { useMemo, useState } from "react";
import { Layout } from "../../../components/Layout/Layout";
import { CitiesList } from "../List/CitiesList";
import { Pagination } from "../../../components/Pagination/Pagination";
import { Button } from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faFilter } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Modal } from "../../../components/Modal/Modal";
import { CityForm } from "../Forms/CitiesForm";

import { useCities } from "../../../hooks/useCities";
import { useCountries } from "../../../hooks/useCountries";

import styles from "./CitiesPage.module.css";
import { Select } from "../../../components/Select/Select";

export const CitiesPage = () => {
    const { cities, addCity, editCity, removeCity } = useCities();
    const { countries } = useCountries();

    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filterCountryId, setFilterCountryId] = useState<number | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "view" | "edit">("view");
    const [selected, setSelected] = useState<any>(null);

    const filteredCities = useMemo(() => {
        let result = cities;

        if (!result) return [];

        if (search.trim()) {
            result = result.filter(c =>
                c.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filterCountryId) {
            result = result.filter(c => c.country_id === filterCountryId);
        }

        return result;
    }, [cities, search, filterCountryId]);

    const totalItems = filteredCities.length;
    const start = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredCities.slice(start, start + itemsPerPage);

    function openCreate() {
        setSelected(null);
        setMode("create");
        setModalOpen(true);
    }

    function openView(city: any) {
        setSelected(city);
        setMode("view");
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
        setSelected(null);
        setMode("view");
    }

    return (
        <Layout>
            <section className={styles.tableSection}>
                <section className={styles.tableButtonsSection}>
                    <span className={styles.table_title}>Cidades</span>

                    <SearchBar
                        value={search}
                        onChange={setSearch}
                        placeholder="Buscar cidade..."
                    />

                    <div className={styles.buttons}>
                        <Button onClick={openCreate} icon={<FontAwesomeIcon icon={faAdd} />}>
                            Nova Cidade
                        </Button>

                        <Button
                            variant="card"
                            icon={<FontAwesomeIcon icon={faFilter} />}
                            onClick={() => setFiltersOpen(prev => !prev)}
                        >
                            Filtros
                        </Button>
                    </div>
                </section>

                {filtersOpen && (
                    <div className={styles.filtersPanel}>
                        <Select
                            label="Filtrar por país"
                            value={filterCountryId ?? ""}
                            onChange={(value) => setFilterCountryId(Number(value))}
                            options={[
                                { value: "", label: "Todos os países" },
                                ...countries.map(c => ({ value: c.id, label: c.name })),
                            ]}
                        />

                        <Button variant="card" onClick={() => setFilterCountryId(null)}>
                            Limpar filtros
                        </Button>
                    </div>
                )}

                <section className={styles.tableWrapper}>
                    <CitiesList data={currentItems} onRowClick={openView} />
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

            <Modal
                isOpen={modalOpen}
                onClose={closeModal}
                title="Dados da Cidade"
            >
                <CityForm
                    mode={mode}
                    defaultValues={selected}
                    countries={countries}
                    onStartEdit={() => setMode("edit")}
                    onCancel={closeModal}
                    onSubmit={async (data) => {
                        await addCity(data);
                        closeModal();
                    }}
                    onEditConfirm={async (data) => {
                        await editCity(data);
                        closeModal();
                    }}
                    onDelete={async () => {
                        await removeCity(selected.id);
                        closeModal();
                    }}
                />
            </Modal>
        </Layout>
    );
};
