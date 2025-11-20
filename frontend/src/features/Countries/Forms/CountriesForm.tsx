import { useState, useEffect } from "react";
import styles from "./CountriesForm.module.css";

import { Input } from "../../../components/Input/Input";
import { Select } from "../../../components/Select/Select";
import { Button } from "../../../components/Button/Button";
import type { Continent } from "../../Continents/continents.types";
import type { Country } from "../countries.types";

interface CountryFormProps {
    mode: "create" | "view" | "edit";
    defaultValues?: {
        id?: number;
        name: string;
        population: number;
        language: string;
        coin: string;
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
    onEditConfirm: (data: Country) => void;
    onDelete?: (id: number) => void | Promise<void>;
}

export const CountryForm = ({
    mode,
    defaultValues,
    continents = [],
    onSubmit,
    onCancel,
    onStartEdit,
    onEditConfirm,
    onDelete,
}: CountryFormProps) => {
    const [name, setName] = useState(defaultValues?.name || "");
    const [population, setPopulation] = useState(defaultValues?.population || 0);
    const [language, setLanguage] = useState(defaultValues?.language || "");
    const [coin, setCoin] = useState(defaultValues?.coin || "");
    const [continentId, setContinentId] = useState(defaultValues?.continent_id || 0);
    const [continentName, setContinentName] = useState(defaultValues?.continent_name || 'nenhum')

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

    const countryToUpdate: Country = {
        id: defaultValues?.id,
        name,
        population,
        language,
        coin,
        continent_id: continentId
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                label="Nome do País"
                value={name}
                onChange={(value) => setName(value)}
                disabled={disabled}
                error={errors.name}
            />

            <Input
                label="População"
                value={String(population)}
                onChange={(value) => setPopulation(Number(value))}
                disabled={disabled}
                error={errors.population}
                type="number"
            />

            <Input
                label="Idioma"
                value={language}
                onChange={(value) => setLanguage(value)}
                disabled={disabled}
                error={errors.language}
            />

            <Input
                label="Moeda"
                value={coin}
                onChange={(value) => setCoin(value)}
                disabled={disabled}
                error={errors.coin}
            />

            <Select
                label="Continente"
                value={continentId}
                onChange={(value, label) => {setContinentId(Number(value)); setContinentName(String(label))}}
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
                        <Button type="submit" variant="blue" onClick={() => onEditConfirm(countryToUpdate)}>
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
