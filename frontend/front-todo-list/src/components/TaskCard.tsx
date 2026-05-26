import React from "react";
import { Tarefa } from "../types/Tarefa";
import { getStatusValue } from "../utils/statusUtils";

interface TarefaCardProps {
  tarefa: Tarefa;
  online: boolean;
  onForward: (id: number) => void;
  onRewind: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TarefaCard({
  tarefa,
  online,
  onForward,
  onRewind,
  onDelete,
}: TarefaCardProps) {
  const sv = getStatusValue(tarefa);
  const nome = tarefa.nome ?? JSON.stringify(tarefa);

  const getStatusColor = () => {
    switch (sv) {
      case 0:
        return "border-l-4 border-l-blue-400";
      case 1:
        return "border-l-4 border-l-amber-400";
      case 2:
        return "border-l-4 border-l-emerald-400";
      default:
        return "border-l-4 border-l-slate-400";
    }
  };

  return (
    <div
      className={`group relative bg-linear-to-br from-slate-800/80 to-slate-900/80 rounded-lg p-4 backdrop-blur-sm border border-slate-700/40 hover:border-slate-600/60 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/50 hover:-translate-y-1 ${getStatusColor()}`}
    >
      {/* Task Title */}
      <p className="text-slate-100 font-semibold mb-3 leading-relaxed pr-6 wrap-break-words line-clamp-2">
        {nome}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-wrap">
        {/* Status Navigation */}
        <div className="flex gap-2 flex-1">
          {sv > 0 && (
            <button
              onClick={() => onRewind(tarefa.id)}
              disabled={!online}
              className="flex-1 px-3 py-2 text-xs font-semibold bg-slate-700/60 hover:bg-slate-600 text-slate-200 rounded transition-all duration-200 hover:shadow-md active:scale-95"
              title="Voltar para status anterior"
            >
              ← Voltar
            </button>
          )}
          {sv < 2 && (
            <button
              onClick={() => onForward(tarefa.id)}
              disabled={!online}
              className="flex-1 px-3 py-2 text-xs font-semibold bg-cyan-600/70 hover:bg-cyan-500 text-white rounded transition-all duration-200 hover:shadow-md hover:shadow-cyan-500/30 active:scale-95"
              title="Avançar para próximo status"
            >
              Iniciar →
            </button>
          )}
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(tarefa.id)}
          disabled={!online}
          className="px-3 py-2 text-xs font-semibold bg-red-500/20 hover:bg-red-500/40 text-red-300 hover:text-red-100 rounded transition-all duration-200 hover:shadow-md hover:shadow-red-500/20 active:scale-95"
          title="Excluir tarefa"
        >
          🗑️ Excluir
        </button>
      </div>
    </div>
  );
}
