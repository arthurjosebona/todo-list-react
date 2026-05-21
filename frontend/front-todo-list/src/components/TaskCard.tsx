import { CSSProperties } from "react";
import { Tarefa } from "../types/Tarefa";
import { getStatusValue } from "../utils/statusUtils";

interface TarefaCardProps {
  tarefa: Tarefa;
  onForward: (id: number) => void;
  onRewind: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TarefaCard({
  tarefa,
  onForward,
  onRewind,
  onDelete,
}: TarefaCardProps) {
  const sv = getStatusValue(tarefa);
  const nome = tarefa.nome ?? JSON.stringify(tarefa);

  return (
    <div style={styles.card}>
      <p style={styles.titulo}>{nome}</p>

      <div style={styles.actions}>
        <button onClick={() => onDelete(tarefa.id)} style={styles.btnDanger}>
          🗑 Excluir
        </button>

        <div style={{ display: "flex", gap: 6 }}>
          {sv > 0 && (
            <button
              onClick={() => onRewind(tarefa.id)}
              style={styles.btnSecondary}
            >
              ← Voltar
            </button>
          )}
          {sv < 2 && (
            <button
              onClick={() => onForward(tarefa.id)}
              style={styles.btnPrimary}
            >
              Iniciar →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const base: CSSProperties = {
  height: 30,
  padding: "0 10px",
  borderRadius: 6,
  fontSize: 12,
  cursor: "pointer",
};

const styles: Record<string, CSSProperties> = {
  card: {
    background: "#1e3050",
    border: "1px solid #2d4a6a",
    borderRadius: 8,
    padding: "12px 14px",
    marginBottom: 8,
  },
  titulo: {
    fontSize: 14,
    color: "#d0e4f7",
    marginBottom: 10,
    wordBreak: "break-word",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnPrimary: {
    ...base,
    background: "#378ADD",
    color: "#fff",
    border: "1px solid #185FA5",
  },
  btnSecondary: {
    ...base,
    background: "#1a2c44",
    color: "#8ba0b8",
    border: "1px solid #2d4a6a",
  },
  btnDanger: {
    ...base,
    background: "transparent",
    color: "#e24b4a",
    border: "1px solid #3d2020",
  },
};
