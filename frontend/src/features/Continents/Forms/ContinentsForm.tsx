import { useState } from "react";
import styles from "./ContinentsForm.module.css";

import { Input } from "../../../components/Input/Input";
import { Textarea } from "../../../components/Textarea/Textarea";
import { Button } from "../../../components/Button/Button";
import type { Continent } from "../continents.types";

interface ContinentFormProps {
  mode: "create" | "view" | "edit";
  defaultValues?: {
    id?: number,
    name: string;
    description: string;
    count?: number;
  };
  onSubmit: (data: { name: string; description: string }) => void;
  onCancel?: () => void;
  onStartEdit?: () => void;
  onConfirmEdit?: (data: Continent) => void;
  onDelete?: (id: number) => void | Promise<void>;
}

export const ContinentForm = ({
  mode,
  defaultValues,
  onSubmit,
  onCancel,
  onStartEdit,
  onConfirmEdit,
  onDelete
}: ContinentFormProps) => {
  const [name, setName] = useState(defaultValues?.name || "");
  const [description, setDescription] = useState(
    defaultValues?.description || ""
  );
  const disabled = mode === "view";

  const [errors, setErrors] = useState<{ name?: string; description?: string }>(
    {}
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err: any = {};
    if (!name.trim()) err.name = "O nome é obrigatório.";
    if (!description.trim()) err.description = "A descrição é obrigatória.";
    setErrors(err);
    if (Object.keys(err).length === 0) onSubmit({ name, description });
  }

  const continentToUpdate: Continent = {
    id: defaultValues?.id,
    name,
    description,
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Nome do Continente"
        value={name}
        onChange={(value) => setName(value)}
        disabled={disabled}
        error={errors.name}
      />

      <Textarea
        label="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={disabled}
        error={errors.description}
      />

      {mode === "view" && (
        <Input label="Quantidade de Países" value={String(defaultValues.count ?? 'Nenhum país relacionado')} disabled />
      )}



      <div className={styles.actions}>
        {mode === "view" && (
          <>
            <Button type="button" variant="blue" onClick={onStartEdit}>
              Editar
            </Button>
            <Button type="button" variant="red" onClick={() => onDelete?.(defaultValues?.id!)}>
              Excluir
            </Button>
          </>
        )}

        {mode === "create" && (
          <>
            <Button type="submit" variant="blue">
              Salvar
            </Button>
            <Button type="button" variant="card" onClick={onCancel}>
              Cancelar
            </Button>
          </>
        )}

        {mode === "edit" && (
          <>
            <Button type="button" variant="blue" onClick={() => onConfirmEdit?.(continentToUpdate)}>
              Atualizar
            </Button>
            <Button type="button" variant="card" onClick={onCancel}>
              Cancelar
            </Button>
          </>
        )}
      </div>
    </form>
  );
};
