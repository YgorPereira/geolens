import { useState } from "react";
import styles from "./CitiesForm.module.css";

import { Input } from "../../../components/Input/Input";
import { Select } from "../../../components/Select/Select";
import { Button } from "../../../components/Button/Button";
import type { Country } from "../../Countries/countries.types";

interface CityFormProps {
    mode: "create" | "view" | "edit";
    defaultValues?: {
        id?: number;
        name: string;
        population: number;
        latitude: number;
        longitude: number;
        country_id: number;
        country_name?: string;
        weather?: string;
    };
    countries?: Country[]
    onSubmit: (data: {
        name: string;
        population: number;
        latitude?: number;
        longitude?: number;
        country_id: number;
    }) => void;
    onCancel?: () => void;
    onStartEdit?: () => void;
    onDelete?: () => void;
}

export const CityForm = ({
    mode,
    defaultValues,
    countries = [],
    onSubmit,
    onCancel,
    onStartEdit,
    onDelete,
}: CityFormProps) => {
    const [name, setName] = useState(defaultValues?.name || "");
    const [population, setPopulation] = useState(defaultValues?.population || 0);
    const [latitude, setLatitude] = useState(defaultValues?.latitude || 0);
    const [longitude, setLongitude] = useState(defaultValues?.longitude || 0);
    const [countryId, setCountryId] = useState(defaultValues?.country_id || 0);

    const disabled = mode === "view";

    const [errors, setErrors] = useState<{
        name?: string;
        population?: string;
        latitude?: string;
        longitude?: string;
        country_id?: string;
    }>({});

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const err: any = {};
        if (!name.trim()) err.name = "O nome é obrigatório.";
        if (!population || population <= 0) err.population = "A população deve ser maior que zero.";
        if (!countryId) err.country_id = "O país é obrigatório.";

        setErrors(err);

        if (Object.keys(err).length === 0) {
            onSubmit({
                name,
                population,
                country_id: countryId,
                latitude: mode !== "view" ? undefined : latitude,
                longitude: mode !== "view" ? undefined : longitude,
            });
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldsWrapper}>
                <Input
                    label="Nome da Cidade"
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

                <Select
                    label="País"
                    value={countryId}
                    onChange={(value) => setCountryId(Number(value))}
                    options={countries.map((c) => ({ value: c.id, label: c.name }))}
                    disabled={disabled}
                    error={errors.country_id}
                />

                {mode === "view" && (
                    <>
                        <Input label="Latitude" value={String(latitude)} disabled />
                        <Input label="Longitude" value={String(longitude)} disabled />
                        <Input label="Clima" value={defaultValues?.weather || "—"} disabled />
                    </>
                )}
            </div>

            <div className={styles.actions}>
                {mode === "view" && (
                    <>
                        {onStartEdit && (
                            <Button type="button" variant="blue" onClick={onStartEdit}>
                                Editar
                            </Button>
                        )}
                        {onDelete && (
                            <Button type="button" variant="card" onClick={() => onDelete(defaultValues.id)}>
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
