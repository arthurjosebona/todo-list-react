import { Tarefa } from "../types/Tarefa";
import { CacheService } from "./cacheService";

const getApiUrl = (baseUrl: string): string => `${baseUrl}/api/v1/tarefas`;

export async function fetchTarefas(baseUrl: string): Promise<Tarefa[]> {
  const cached = CacheService.getTarefasFromCache();
  if (cached !== null) return cached;

  const res = await fetch(getApiUrl(baseUrl));
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data : Tarefa[] = await res.json();
  console.log("Definindo tarefas no cache: ", data);
  CacheService.setTarefasCache(data);
  return data;
}

export function fetchFromCacheOnly(): Tarefa[] | null {
  return CacheService.getTarefasFromCache();
}

export async function createTarefa(
  baseUrl: string,
  nome: string,
): Promise<Tarefa> {
  const res = await fetch(getApiUrl(baseUrl), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome }),
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  const novaTarefa: Tarefa = await res.json();

  const cached = CacheService.getTarefasFromCache();
  if (cached !== null) {
    CacheService.setTarefasCache([...cached, novaTarefa]); // adiciona no final
  }

  return novaTarefa;
}

export async function forwardTarefa(
  baseUrl: string,
  id: number,
): Promise<Tarefa> {
  const res = await fetch(`${getApiUrl(baseUrl)}/status/forward/${id}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  const updated : Tarefa = await res.json();

  const cached = CacheService.getTarefasFromCache();

  if (cached !== null) {
    CacheService.setTarefasCache(cached.map(t => t.id === id ? updated : t));
  }

  return updated;
}

export async function rewindTarefa(
  baseUrl: string,
  id: number,
): Promise<Tarefa> {
  const res = await fetch(`${getApiUrl(baseUrl)}/status/rewind/${id}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  const updated : Tarefa = await res.json();

  const cached = CacheService.getTarefasFromCache();

  if (cached !== null) {
    CacheService.setTarefasCache(cached.map(t => t.id === id ? updated : t));
  }

  return updated;
}

export async function deleteTarefa(baseUrl: string, id: number): Promise<void> {
  const res = await fetch(`${getApiUrl(baseUrl)}/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) throw new Error("HTTP " + res.status);

  const cached = CacheService.getTarefasFromCache();
  if (cached !== null) {
    CacheService.setTarefasCache(cached.filter(t => t.id !== id)); // remove o item
  }
}
