import { Layout } from "../../../components/Layout/Layout";
import { CountriesList } from "../List/CountriesList";
import { toast } from "sonner";
import { Pagination } from "../../../components/Pagination/Pagination";
import { useState, useMemo } from "react";
import styles from "./CountriesPage.module.css";
import { Button } from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faFilter } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Modal } from "../../../components/Modal/Modal";
import { CountryForm } from "../Forms/CountriesForm";
import { useCountries } from "../../../hooks/useCountries";
import { useContinents } from "../../../hooks/useContinents";
import type { Country } from "../countries.types";
import { Select } from "../../../components/Select/Select";
import { Input } from "../../../components/Input/Input";

export const CountriesPage = () => {
    const itemsPerPage = 7;
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filterContinentId, setFilterContinentId] = useState<number | null>(null);
    const [filterLanguage, setFilterLanguage] = useState<string | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "view" | "edit">("view");
    const [selected, setSelected] = useState<any>(null);

    const { countries, removeCountry, editCountry, addCountry } = useCountries();
    const { continents } = useContinents();

    const filteredCountries = useMemo(() => {
        if (!countries) return [];
        let result = countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
        if (filterContinentId) result = result.filter(c => c.continent_id === filterContinentId);
        if (filterLanguage) result = result.filter(c => c.language.toLowerCase().includes(filterLanguage.toLowerCase()));
        return result;
    }, [search, countries, filterContinentId, filterLanguage]);

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

    const confirmDelete = async (id: number) => {
        toast.error("Excluir esse país irá excluir cidades relacionadas.", {
            description: "Deseja continuar?",
            action: {
                label: "Excluir",
                onClick: () => {
                    removeCountry(id)
                        .then(() => closeModal())
                        .catch(err => console.error(err));
                },
            },
            cancel: { label: "Cancelar" },
        });
    };

    return (
        <Layout>
            <section className={styles.tableSection}>
                <section className={styles.tableButtonsSection}>
                    <span className={styles.table_title}>Países</span>

                    <div className={styles.searchWrapper}>
                        <SearchBar value={search} onChange={setSearch} placeholder="Buscar país..." />
                    </div>

                    <div className={styles.buttons}>
                        <Button onClick={openCreate} icon={<FontAwesomeIcon icon={faAdd} />}>Novo País</Button>
                        <Button variant="card" icon={<FontAwesomeIcon icon={faFilter} />} onClick={() => setFiltersOpen(prev => !prev)}>
                            Filtros
                        </Button>
                    </div>
                </section>

                {filtersOpen && (
                    <div className={styles.filtersPanel}>
                        <Select
                            label="Filtrar por continente"
                            value={filterContinentId ?? ""}
                            onChange={v => setFilterContinentId(Number(v))}
                            options={[
                                { value: "", label: "Todos os continentes" },
                                ...continents.map(c => ({ value: c.id, label: c.name })),
                            ]}
                        />
                        <Input
                            label="Filtrar por idioma"
                            value={filterLanguage ?? ""}
                            onChange={v => setFilterLanguage(v)}
                        />
                        <Button variant="card" onClick={() => { setFilterContinentId(null); setFilterLanguage(null); }}>
                            Limpar filtros
                        </Button>
                    </div>
                )}

                <section className={styles.tableWrapper}>
                    <CountriesList data={currentItems} onRowClick={openView} />
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
                    continents={continents}
                    onSubmit={async (data: Country) => { await addCountry(data); closeModal(); }}
                    onDelete={confirmDelete}
                    onEditConfirm={async (data: Country) => { await editCountry(data); closeModal(); }}
                    onCancel={closeModal}
                    onStartEdit={handleEdit}
                />
            </Modal>
        </Layout>
    );
};
