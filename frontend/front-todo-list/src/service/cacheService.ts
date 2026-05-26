import { Tarefa } from "../types/Tarefa";

export class CacheService {
  static getTarefasFromCache(): Tarefa[] | null {
    try {
      const cached = localStorage.getItem("tarefas_cache");
      const expiry = localStorage.getItem("tarefas_cache_expiry");

      if (!cached || !expiry) return null;

      if (Date.now() > parseInt(expiry)) {
        this.clearCache();
        return null;
      }

      return JSON.parse(cached).data;
    } catch (e) {
      this.clearCache();
      return null;
    }
  }

  static setTarefasCache(tarefas: Tarefa[]): void {
    try {
      const cacheData = {
        data: tarefas,
        timestamp: Date.now(),
      };

      localStorage.setItem("tarefas_cache", JSON.stringify(cacheData));
      localStorage.setItem(
        "tarefas_cache_expiry",
        (Date.now() + 10000).toString()
      );
    } catch (e) {
      console.error("Erro ao salvar cache:", e);
    }
  }

  static clearCache(): void {
    try {
      localStorage.removeItem("tarefas_cache");
      localStorage.removeItem("tarefas_cache_expiry");
    } catch (e) {
      console.error("Erro ao limpar cache:", e);
    }
  }
}