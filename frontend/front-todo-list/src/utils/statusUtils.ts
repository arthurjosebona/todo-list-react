import { Tarefa, StatusValue } from "../types/Tarefa";

export const STATUS_LABELS: string[] = [
  "Pendentes",
  "Em Execução",
  "Concluídas",
];
export const STATUS_ICONS: string[] = ["⏳", "⚙️", "✅"];
export const STATUS_COLORS: string[] = ["#EF9F27", "#378ADD", "#1D9E75"];

export function getStatusValue(tarefa: Tarefa): StatusValue {
  if (typeof tarefa.status === "number") return tarefa.status as StatusValue;
  const s = String(tarefa.status ?? "").toUpperCase();
  if (s === "PENDENTE" || s === "0") return 0;
  if (s === "EM_EXECUCAO" || s === "1") return 1;
  if (s === "CONCLUIDO" || s === "2") return 2;
  return 0;
}

export function groupByStatus(
  tarefas: Tarefa[],
): [Tarefa[], Tarefa[], Tarefa[]] {
  const cols: [Tarefa[], Tarefa[], Tarefa[]] = [[], [], []];
  tarefas.forEach((t) => {
    const sv = Math.min(getStatusValue(t), 2) as 0 | 1 | 2;
    cols[sv].push(t);
  });
  return cols;
}
