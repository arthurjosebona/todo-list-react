import { useState, useCallback } from "react";
import { Tarefa } from "../types/Tarefa";
import * as tarefaService from "../service/tarefaService";

interface UseTarefasReturn {
  tarefas: Tarefa[];
  loading: boolean;
  online: boolean;
  load: () => Promise<void>;
  loadCache: () => void;
  create: (titulo: string) => Promise<void>;
  forward: (id: number) => Promise<void>;
  rewind: (id: number) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export function useTarefas(baseUrl: string): UseTarefasReturn {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [online, setOnline] = useState<boolean>(false);

  const load = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await tarefaService.fetchTarefas(baseUrl);
      setTarefas(data);
      setOnline(true);
    } catch (e) {
      setOnline(false);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  const loadCache = useCallback(async (): Promise<void> => {
    const cached = tarefaService.fetchFromCacheOnly();
    if (cached !== null) {
      setTarefas(cached);
    }
  }, []);

  const create = useCallback(
    async (titulo: string): Promise<void> => {
      const nova = await tarefaService.createTarefa(baseUrl, titulo);
      setTarefas((prev) => [...prev, nova]);
    },
    [baseUrl],
  );

  const forward = useCallback(
    async (id: number): Promise<void> => {
      const updated = await tarefaService.forwardTarefa(baseUrl, id);
      setTarefas((prev) => prev.map((t) => (t.id === id ? updated : t)));
    },
    [baseUrl],
  );

  const rewind = useCallback(
    async (id: number): Promise<void> => {
      const updated = await tarefaService.rewindTarefa(baseUrl, id);
      setTarefas((prev) => prev.map((t) => (t.id === id ? updated : t)));
    },
    [baseUrl],
  );

  const remove = useCallback(
    async (id: number): Promise<void> => {
      await tarefaService.deleteTarefa(baseUrl, id);
      setTarefas((prev) => prev.filter((t) => t.id !== id));
    },
    [baseUrl],
  );

  return { tarefas, loading, online, load, loadCache, create, forward, rewind, remove };
}
