import { useState, useEffect } from "react";
import styles from "./CountriesForm.module.css";

import { Input } from "../../../components/Input/Input";
import { Select } from "../../../components/Select/Select";
import { Button } from "../../../components/Button/Button";
import type { Continent } from "../../Continents/continents.types";

interface CountryFormProps {
    mode: "create" | "view" | "edit";
    defaultValues?: {
        id?: number;
        name: string;
        population: number;
        language: string;
        coin: string;
        continent_id: number;
        continent_name?: string;
    };
    continents?: Continent[];
    onSubmit: (data: {
        name: string;
        population: number;
        language: string;
        coin: string;
        continent_id: number;
    }) => void;
    onCancel?: () => void;
    onStartEdit?: () => void;
    onDelete?: (id: number) => void | Promise<void>;
}

export const CountryForm = ({
    mode,
    defaultValues,
    continents = [],
    onSubmit,
    onCancel,
    onStartEdit,
    onDelete,
}: CountryFormProps) => {
    const [name, setName] = useState(defaultValues?.name || "");
    const [population, setPopulation] = useState(defaultValues?.population || 0);
    const [language, setLanguage] = useState(defaultValues?.language || "");
    const [coin, setCoin] = useState(defaultValues?.coin || "");
    const [continentId, setContinentId] = useState(defaultValues?.continent_id || 0);

    const disabled = mode === "view";

    const [errors, setErrors] = useState<{
        name?: string;
        population?: string;
        language?: string;
        coin?: string;
        continent_id?: string;
    }>({});

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const err: any = {};
        if (!name.trim()) err.name = "O nome é obrigatório.";
        if (!population || population <= 0) err.population = "A população deve ser maior que zero.";
        if (!language.trim()) err.language = "O idioma é obrigatório.";
        if (!coin.trim()) err.coin = "A moeda é obrigatória.";
        if (!continentId) err.continent_id = "O continente é obrigatório.";

        setErrors(err);

        if (Object.keys(err).length === 0) {
            onSubmit({ name, population, language, coin, continent_id: continentId });
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                label="Nome do País"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={disabled}
                error={errors.name}
            />

            <Input
                label="População"
                value={String(population)}
                onChange={(e) => setPopulation(Number(e.target.value))}
                disabled={disabled}
                error={errors.population}
            />

            <Input
                label="Idioma"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={disabled}
                error={errors.language}
            />

            <Input
                label="Moeda"
                value={coin}
                onChange={(e) => setCoin(e.target.value)}
                disabled={disabled}
                error={errors.coin}
            />

            <Select
                label="Continente"
                value={continentId}
                onChange={(value) => setContinentId(Number(value))}
                options={continents.map((c) => ({ value: c.id, label: c.name }))}
                disabled={disabled}
                error={errors.continent_id}
            />

            <div className={styles.actions}>
                {mode === "view" && (
                    <>
                        {onStartEdit && (
                            <Button type="button" variant="blue" onClick={onStartEdit}>
                                Editar
                            </Button>
                        )}
                        {onDelete && (
                            <Button type="button" variant="card" onClick={() => onDelete(defaultValues?.id)}>
                                Excluir
                            </Button>
                        )}
                        {onCancel && (
                            <Button type="button" variant="card" onClick={onCancel}>
                                Fechar
                            </Button>
                        )}
                    </>
                )}

                {mode === "create" && (
                    <>
                        <Button type="submit" variant="blue">
                            Salvar
                        </Button>
                        {onCancel && (
                            <Button type="button" variant="card" onClick={onCancel}>
                                Cancelar
                            </Button>
                        )}
                    </>
                )}

                {mode === "edit" && (
                    <>
                        <Button type="submit" variant="blue">
                            Atualizar
                        </Button>
                        {onCancel && (
                            <Button type="button" variant="card" onClick={onCancel}>
                                Cancelar
                            </Button>
                        )}
                    </>
                )}
            </div>
        </form>
    );
};
