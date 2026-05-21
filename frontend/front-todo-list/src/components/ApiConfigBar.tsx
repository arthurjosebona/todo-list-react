import { CSSProperties } from "react";

interface ApiConfigBarProps {
  baseUrl: string;
  onChange: (value: string) => void;
  onConnect: () => void;
  online: boolean;
}

export default function ApiConfigBar({
  baseUrl,
  onChange,
  onConnect,
  online,
}: ApiConfigBarProps) {
  return (
    <div className="w-full max-w-2xl px-6 py-4 bg-linear-to-r from-slate-800 via-slate-700 to-slate-800 rounded-xl shadow-2xl border border-slate-600/50 backdrop-blur-sm">
      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              online
                ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                : "bg-red-400/60"
            }`}
          />
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
            {online ? "Online" : "Offline"}
          </span>
        </div>

        <input
          value={baseUrl}
          onChange={(e) => onChange(e.target.value)}
          placeholder="http://localhost:8080"
          className="text-gray-400 focus:text-white flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600/30 rounded-lg placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 text-sm font-mono"
        />

        <button
          onClick={onConnect}
          className="px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5 active:translate-y-0 text-sm whitespace-nowrap"
        >
          Conectar
        </button>
      </div>
    </div>
  );
}
