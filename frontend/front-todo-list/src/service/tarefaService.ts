import { Tarefa } from "../types/Tarefa";

const getApiUrl = (baseUrl: string): string => `${baseUrl}/api/v1/tarefas`;

export async function fetchTarefas(baseUrl: string): Promise<Tarefa[]> {
  const res = await fetch(getApiUrl(baseUrl));
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
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
  return res.json();
}

export async function forwardTarefa(
  baseUrl: string,
  id: number,
): Promise<Tarefa> {
  const res = await fetch(`${getApiUrl(baseUrl)}/status/forward/${id}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

export async function rewindTarefa(
  baseUrl: string,
  id: number,
): Promise<Tarefa> {
  const res = await fetch(`${getApiUrl(baseUrl)}/status/rewind/${id}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

export async function deleteTarefa(baseUrl: string, id: number): Promise<void> {
  const res = await fetch(`${getApiUrl(baseUrl)}/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) throw new Error("HTTP " + res.status);
}
