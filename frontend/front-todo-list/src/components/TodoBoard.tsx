import React, { useState, useEffect } from "react";
import { useTarefas } from "../hooks/useTarefas";
import { groupByStatus } from "../utils/statusUtils";
import KanbanColumn from "./TaskList";
import CreateTaskForm from "./CreateTaskForm";
import ApiConfigBar from "./ApiConfigBar";

export default function TodoBoard() {
  const [baseUrl, setBaseUrl] = useState<string>("http://localhost:8080");

  const { tarefas, loading, online, load, loadCache, create, forward, rewind, remove } =
    useTarefas(baseUrl);

  useEffect(() => {
    loadCache();
  }, []);

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
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-hidden relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen p-6 sm:p-8">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-bold mb-2 bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            To-do List
          </h1>
          <p className="text-slate-400 text-lg">
            Gerencie suas tarefas em{" "}
            <span className="text-cyan-400 font-semibold">tempo real</span>
          </p>
        </header>

        <div className="w-full max-w-2xl mb-6 animate-fade-in-delay-1">
          <ApiConfigBar
            baseUrl={baseUrl}
            onChange={setBaseUrl}
            onConnect={handleConnect}
            online={online}
          />
        </div>

        <div className="w-full max-w-2xl mb-8 animate-fade-in-delay-2">
          <CreateTaskForm onCreate={handleCreate} disabled={!online} />
        </div>

        <div className="w-full max-w-7xl animate-fade-in-delay-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative w-12 h-12 mb-4">
                <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-blue-400 rounded-full animate-spin" />
                <div className="absolute inset-1 bg-slate-900 rounded-full" />
              </div>
              <p className="text-slate-400 text-lg font-medium">
                Conectando ao backend...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lx:grid-cols-3 gap-6 auto-rows-max">
              {columns.map((grupo, idx) => (
                <div
                  key={idx}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${idx * 100}ms`,
                  }}
                >
                  <KanbanColumn
                    index={idx as 0 | 1 | 2}
                    tarefas={grupo}
                    online={online}
                    onForward={handleForward}
                    onRewind={handleRewind}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-delay-1 {
          animation: fade-in 0.6s ease-out 0.1s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.6s ease-out 0.2s both;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.6s ease-out 0.3s both;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.5);
        }
      `}</style>
    </div>
  );
}
