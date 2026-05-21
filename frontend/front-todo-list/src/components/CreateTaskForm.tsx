import React, { useState, KeyboardEvent } from "react";

interface CreateTaskFormProps {
  onCreate: (titulo: string) => void;
  disabled?: boolean;
}

export default function CreateTaskForm({
  onCreate,
  disabled = false,
}: CreateTaskFormProps) {
  const [novaTarefa, setNovaTarefa] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  const handleCreate = () => {
    const titulo = novaTarefa.trim();
    if (!titulo || disabled) return;
    onCreate(titulo);
    setNovaTarefa("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCreate();
  };

  const isActive = novaTarefa.trim().length > 0 && !disabled;

  return (
    <div className="w-full max-w-2xl mt-8">
      <div
        className={`flex gap-3 transition-all duration-300 ${
          isFocused ? "opacity-100" : "opacity-80"
        }`}
      >
        {/* Input Field */}
        <input
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Nova tarefa..."
          disabled={disabled}
          className={`flex-1 px-5 py-3 rounded-lg text-slate-100 placeholder-slate-500 font-medium transition-all duration-200 focus:outline-none ${
            disabled
              ? "bg-slate-800/30 border border-slate-700/30 text-slate-400 cursor-not-allowed"
              : "bg-slate-800/50 border border-slate-600/40 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20"
          }`}
        />

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={!isActive}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap text-sm ${
            isActive
              ? "bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
          }`}
        >
          Criar
        </button>
      </div>

      {disabled && (
        <p className="transition-all hover:scale-101 hover:backdrop-opacity-100 hover:text-amber-400 mt-2 text-xs text-amber-400/70 font-medium">
          ⚠️ Conecte ao backend primeiro
        </p>
      )}
    </div>
  );
}
