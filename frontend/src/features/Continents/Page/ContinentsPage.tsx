import { Layout } from "../../../components/Layout/Layout";
import { ContinentsList } from "../List/ContinentsList";
import { Pagination } from "../../../components/Pagination/Pagination";

import { useState, useMemo, useEffect } from "react";
import styles from "./ContinentsPage.module.css";

import { Button } from "../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../../../components/SearchBar/SearchBar";

import { Modal } from "../../../components/Modal/Modal";
import { ContinentForm } from "../Forms/ContinentsForm";

import type { Continent } from "../continents.types";
import { useContinents } from "../../../hooks/useContinents";

export const ContinentsPage = () => {
    const itemsPerPage = 6;

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "view" | "edit">("view");

    const [selected, setSelected] = useState<Continent | null>(null);

    const {
        continents,
        removeContinent,
        editContinent,
        addContinent
    } = useContinents()

    const filteredContinents = useMemo(() => {
        if (!continents) return;

        return continents.filter(continent =>
            continent.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, continents]);

    const totalItems = filteredContinents.length;
    const start = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredContinents.slice(start, start + itemsPerPage);

    function openCreate() {
        setSelected(null);
        setFormMode("create");
        setModalOpen(true);
    }

    function openView(item: Continent) {
        setSelected(item);
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
                    <span className={styles.table_title}>Continentes</span>

                    <div className={styles.searchWrapper}>
                        <SearchBar
                            value={search}
                            onChange={setSearch}
                            placeholder="Buscar continente..."
                        />
                    </div>

                    <div className={styles.buttons}>
                        <Button onClick={openCreate}>Novo Continente</Button>

                        <Button variant="card" icon={<FontAwesomeIcon icon={faFilter} />}>
                            Filtros
                        </Button>
                    </div>
                </section>

                <section className={styles.tableWrapper}>
                    <ContinentsList
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

            <Modal isOpen={modalOpen} onClose={closeModal} title="Dados do Continente">
                <ContinentForm
                    mode={formMode}
                    defaultValues={
                        selected
                            ? {
                                id: selected.id,
                                name: selected.name,
                                description: selected.description,
                                count: selected.count_paises
                            }
                            : undefined
                    }
                    onSubmit={async (data: Continent) => {
                        await addContinent(data);
                        closeModal();
                    }}
                    onDelete={async (id) => {
                        await removeContinent(id);
                        closeModal()
                    }}
                    onConfirmEdit={async (data : Continent) => {
                        await editContinent(data);
                        closeModal();
                    }}
                    onCancel={closeModal}
                    onStartEdit={handleEdit}
                />
            </Modal>
        </Layout>
    );
};
