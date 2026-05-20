package com.senai.todolist.app_todo_list.model.enums;

public enum Status {
    PENDENTE {
        @Override
        public Status forward() {
            return EM_EXECUCAO;
        }

        @Override
        public Status rewind() {
            return this;
        }
    },
    EM_EXECUCAO {
        @Override
        public Status forward() {
            return CONCLUIDO;
        }

        @Override
        public Status rewind() {
            return PENDENTE;
        }
    },
    CONCLUIDO {
        @Override
        public Status forward() {
            return this;
        }

        @Override
        public Status rewind() {
            return EM_EXECUCAO;
        }
    };

    public abstract Status forward();
    public abstract Status rewind();
}