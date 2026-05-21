import { useState, KeyboardEvent } from "react";

interface CreateTaskFormProps {
  onCreate: (titulo: string) => void;
  disabled?: boolean;
}

export default function CreateTaskForm({
  onCreate,
  disabled = false,
}: CreateTaskFormProps) {
  const [novaTarefa, setNovaTarefa] = useState<string>("");

  const handleCreate = () => {
    const titulo = novaTarefa.trim();
    if (!titulo || disabled) return;
    onCreate(titulo);
    setNovaTarefa("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCreate();
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        maxWidth: 520,
        margin: "0 auto 2rem",
      }}
    >
      <input
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Nova tarefa..."
        disabled={disabled}
        style={{
          flex: 1,
          height: 40,
          padding: "0 14px",
          borderRadius: 8,
          border: "1px solid #2d4a6a",
          background: "#162032",
          color: "#d0e4f7",
          fontSize: 14,
          outline: "none",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "text",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => {
          if (!disabled) e.currentTarget.style.borderColor = "#378ADD";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#2d4a6a";
        }}
      />
      <button
        onClick={handleCreate}
        disabled={disabled || !novaTarefa.trim()}
        style={{
          height: 40,
          padding: "0 18px",
          borderRadius: 8,
          fontSize: 14,
          cursor: disabled || !novaTarefa.trim() ? "not-allowed" : "pointer",
          background: "#378ADD",
          color: "#fff",
          border: "1px solid #185FA5",
          opacity: disabled || !novaTarefa.trim() ? 0.5 : 1,
          transition: "opacity 0.2s",
          fontWeight: 500,
        }}
      >
        + Criar
      </button>
    </div>
  );
}
