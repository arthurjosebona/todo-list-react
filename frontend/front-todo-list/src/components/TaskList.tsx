import React from "react";
import { Tarefa } from "../types/Tarefa";
import { STATUS_LABELS } from "../utils/statusUtils";
import TaskCard from "./TaskCard";

interface TaskListProps {
  index: 0 | 1 | 2;
  tarefas: Tarefa[];
  online: boolean;
  onForward: (id: number) => void;
  onRewind: (id: number) => void;
  onDelete: (id: number) => void;
}

const columnColors = {
  0: {
    bg: "bg-gradient-to-b from-blue-900/20 to-blue-900/5",
    border: "border-blue-600/40",
    badge: "bg-blue-500/30 text-blue-100 border-blue-400/30",
    shadow: "hover:shadow-blue-600/40",
  },
  1: {
    bg: "bg-gradient-to-b from-amber-900/20 to-amber-900/5",
    border: "border-amber-600/40",
    badge: "bg-amber-500/30 text-amber-100 border-amber-400/30",
    shadow: "hover: shadow-amber-600/40",
  },
  2: {
    bg: "bg-gradient-to-b from-emerald-900/20 to-emerald-900/5",
    border: "border-emerald-600/40",
    badge: "bg-emerald-500/30 text-emerald-100 border-emerald-400/30",
    shadow: "hover: shadow-emerald-600/40",
  },
};

export default function TaskList({
  index,
  tarefas,
  online,
  onForward,
  onRewind,
  onDelete,
}: TaskListProps) {
  const colors = columnColors[index];

  return (
    <div
      className={`group flex-1 min-w-sm flex flex-col rounded-xl backdrop-blur-sm border-2 transition-all duration-300 ${colors.bg} ${colors.border} overflow-hidden opacity-75 hover:opacity-100`}
    >
      <div className="sticky top-0 px-5 py-4 border-b border-slate-700/40 bg-slate-900/40 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-slate-100 font-bold text-lg">
            {STATUS_LABELS[index]}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold border ${colors.badge}`}
          >
            {tarefas.length}
          </span>
        </div>
      </div>

      {/* Tasks Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar">
        {tarefas.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-slate-500 group-hover:text-slate-200/80 transition-colors">
            <p className="text-center text-sm font-medium">
              <span className="block mb-1 text-lg opacity-50">∅</span>
              Nenhuma tarefa
            </p>
          </div>
        ) : (
          tarefas.map((t) => (
            <TaskCard
              key={t.id}
              tarefa={t}
              online={online}
              onForward={onForward}
              onRewind={onRewind}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
