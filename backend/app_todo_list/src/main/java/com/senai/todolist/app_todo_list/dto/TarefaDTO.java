package com.senai.todolist.app_todo_list.dto;

import com.senai.todolist.app_todo_list.model.enums.Status;

import lombok.Builder;

@Builder
public record TarefaDTO(
    Long id,
    String nome,
    Status status
) {}
