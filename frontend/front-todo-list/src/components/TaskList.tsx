import { CSSProperties } from "react";
import { Tarefa } from "../types/Tarefa";
import {
  STATUS_LABELS,
  STATUS_ICONS,
  STATUS_COLORS,
} from "../utils/statusUtils";
import TaskCard from "./TaskCard";

interface KanbanColumnProps {
  index: 0 | 1 | 2;
  tarefas: Tarefa[];
  onForward: (id: number) => void;
  onRewind: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function KanbanColumn({
  index,
  tarefas,
  onForward,
  onRewind,
  onDelete,
}: KanbanColumnProps) {
  return (
    <div style={styles.column}>
      <div style={styles.header}>
        <span style={styles.title}>
          <span style={{ color: STATUS_COLORS[index] }}>
            {STATUS_ICONS[index]}
          </span>
          {STATUS_LABELS[index]}
        </span>
        <span style={styles.badge}>{tarefas.length}</span>
      </div>

      {tarefas.length === 0 ? (
        <p style={styles.empty}>Nenhuma tarefa</p>
      ) : (
        tarefas.map((t) => (
          <TaskCard
            key={t.id}
            tarefa={t}
            onForward={onForward}
            onRewind={onRewind}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  column: {
    background: "#162032",
    border: "1px solid #2d4a6a",
    borderRadius: 12,
    padding: 14,
    minHeight: 200,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    color: "#d0e4f7",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  badge: {
    background: "#1e3050",
    border: "1px solid #2d4a6a",
    borderRadius: 99,
    padding: "1px 10px",
    fontSize: 12,
    color: "#8ba0b8",
  },
  empty: {
    textAlign: "center",
    color: "#4a6080",
    fontSize: 13,
    paddingTop: "1.5rem",
  },
};
