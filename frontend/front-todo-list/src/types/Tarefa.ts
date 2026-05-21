export type StatusValue = 0 | 1 | 2;

export interface Tarefa {
  id: number;
  nome: string;
  status: StatusValue | string;
}
