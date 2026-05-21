import { useState, CSSProperties } from "react";
import { useTarefas } from "../hooks/useTarefas";
import { groupByStatus } from "../utils/statusUtils";
import KanbanColumn from "./TaskList";
import CreateTaskForm from "./CreateTaskForm";
import ApiConfigBar from "./ApiConfigBar";

export default function TodoBoard() {
  const [baseUrl, setBaseUrl] = useState<string>("http://localhost:8080");

  const { tarefas, loading, online, load, create, forward, rewind, remove } =
    useTarefas(baseUrl);

  const handleConnect = async (): Promise<void> => {
    try {
      await load();
    } catch (e) {
      console.log("Erro ao conectar: " + (e as Error).message, true);
    }
  };

  const handleCreate = async (titulo: string): Promise<void> => {
    if (!online) {
      console.log("Conecte ao backend primeiro", true);
      return;
    }
    try {
      await create(titulo);
      console.log("Tarefa criada!");
    } catch (e) {
      console.log("Erro ao criar: " + (e as Error).message, true);
    }
  };

  const handleForward = async (id: number): Promise<void> => {
    try {
      await forward(id);
    } catch (e) {
      console.log("Erro: " + (e as Error).message, true);
    }
  };

  const handleRewind = async (id: number): Promise<void> => {
    try {
      await rewind(id);
    } catch (e) {
      console.log("Erro: " + (e as Error).message, true);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await remove(id);
      console.log("Tarefa excluída");
    } catch (e) {
      console.log("Erro ao excluir: " + (e as Error).message, true);
    }
  };

  const columns = groupByStatus(tarefas);

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>📋 Meu Quadro Kanban</h1>
        <p style={styles.subtitle}>
          Gerencie suas tarefas em{" "}
          <span style={{ color: "#60b4ff" }}>tempo real</span>
        </p>
      </div>

      <ApiConfigBar
        baseUrl={baseUrl}
        onChange={setBaseUrl}
        onConnect={handleConnect}
        online={online}
      />

      <CreateTaskForm onCreate={handleCreate} disabled={!online} />

      {loading ? (
        <p style={styles.loadingText}>Conectando ao backend...</p>
      ) : (
        <div style={styles.board}>
          {columns.map((grupo, idx) => (
            <KanbanColumn
              key={idx}
              index={idx as 0 | 1 | 2}
              tarefas={grupo}
              onForward={handleForward}
              onRewind={handleRewind}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#0d1b2e",
    padding: "2rem 1.5rem",
    fontFamily: "sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: 26,
    fontWeight: 700,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  subtitle: {
    fontSize: 13,
    color: "#8ba0b8",
    marginTop: 4,
  },
  loadingText: {
    textAlign: "center",
    color: "#8ba0b8",
    fontSize: 14,
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 14,
  },
};
