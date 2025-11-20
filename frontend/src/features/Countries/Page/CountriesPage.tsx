import { Layout } from "../../../components/Layout/Layout";
import { CountriesList } from "../List/CountriesList";
// import { countries } from "../countries.types";
import { Pagination } from "../../../components/Pagination/Pagination";
import { useState, useMemo } from "react";
import styles from "./CountriesPage.module.css";
import { Button } from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Modal } from "../../../components/Modal/Modal";
import { CountryForm } from "../Forms/CountriesForm";
import { useCountries } from "../../../hooks/useCountries";

export const CountriesPage = () => {
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "view" | "edit">("view");
    const [selected, setSelected] = useState<any>(null);

    const continentsOptions = [
        { id: 1, name: "América do Sul" },
        { id: 2, name: "África" },
        { id: 3, name: "Europa" },
    ];

    const {
        countries,
    } = useCountries()

    const filteredCountries = useMemo(() => {
        if (!countries) return;

        return countries.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
    }, [search, countries]);

    const totalItems = filteredCountries.length;
    const start = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredCountries.slice(start, start + itemsPerPage);

    function openCreate() {
        setSelected(null);
        setFormMode("create");
        setModalOpen(true);
    }

    function openView(country: typeof countries[0]) {
        setSelected(country);
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
                    <span className={styles.table_title}>Países</span>

                    <div className={styles.searchWrapper}>
                        <SearchBar value={search} onChange={setSearch} placeholder="Buscar país..." />
                    </div>

                    <div className={styles.buttons}>
                        <Button onClick={openCreate}>Novo País</Button>
                        <Button variant="card" icon={<FontAwesomeIcon icon={faFilter} />}>
                            Filtros
                        </Button>
                    </div>
                </section>

                <section className={styles.tableWrapper}>
                    <CountriesList data={currentItems} onRowClick={openView}/>
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

            <Modal isOpen={modalOpen} onClose={closeModal} title="Dados do País">
                <CountryForm
                    mode={formMode}
                    defaultValues={selected}
                    continentsOptions={continentsOptions}
                    onSubmit={(data) => {
                        console.log("SUBMIT", formMode, data);
                        closeModal();
                    }}
                    onCancel={closeModal}
                    onStartEdit={handleEdit}
                />
            </Modal>
        </Layout>
    );
};
