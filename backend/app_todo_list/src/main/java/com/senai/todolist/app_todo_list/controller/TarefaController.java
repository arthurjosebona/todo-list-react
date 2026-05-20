package com.senai.todolist.app_todo_list.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senai.todolist.app_todo_list.dto.TarefaDTO;
import com.senai.todolist.app_todo_list.service.TarefaService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/tarefas")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class TarefaController {
    private final TarefaService tarefaService;

    @PostMapping()
    public ResponseEntity<TarefaDTO> create(@RequestBody TarefaDTO entity) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tarefaService.create(entity));
    }

    @GetMapping("/{id}") 
    public ResponseEntity<TarefaDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(tarefaService.findById(id));
    }
    
    @GetMapping()
    public ResponseEntity<List<TarefaDTO>> findAll() {
        return ResponseEntity.ok(tarefaService.findAll());
    }

    @PatchMapping("/status/forward/{id}")
    public ResponseEntity<TarefaDTO> forward(@PathVariable Long id) {
        return ResponseEntity.ok(tarefaService.stateForward(id));
    }

    @PatchMapping("/status/rewind/{id}")
    public ResponseEntity<TarefaDTO> rewind(@PathVariable Long id) {
        return ResponseEntity.ok(tarefaService.stateRewind(id));
    }

    
}
