package com.senai.todolist.app_todo_list.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.senai.todolist.app_todo_list.dto.TarefaDTO;
import com.senai.todolist.app_todo_list.model.Tarefa;
import com.senai.todolist.app_todo_list.model.enums.Status;
import com.senai.todolist.app_todo_list.repository.TarefaRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TarefaService {
    private final TarefaRepository tarefaRepository;

    public TarefaDTO create(TarefaDTO dto) {
        Tarefa tarefa = mapEntity(dto);
        tarefa.setStatus(Status.PENDENTE);
        return mapDto(tarefaRepository.save(tarefa));
    }

    public void delete(Long id) {
        tarefaRepository.deleteById(id);
    }

    public List<TarefaDTO> findAll() {
        return tarefaRepository.findAll().stream().map(t -> mapDto(t)).toList();
    }

    public TarefaDTO findById(Long id) {
        return mapDto(tarefaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada com ID:" + id)));
    }

    public TarefaDTO stateForward(Long id) {
        Tarefa tarefa = tarefaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada com ID:" + id));
        tarefa.setStatus(tarefa.getStatus().forward());
        tarefaRepository.save(tarefa);
        return mapDto(tarefa);
    }
    
    public TarefaDTO stateRewind(Long id) {
        Tarefa tarefa = tarefaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Tarefa não encontrada com ID:" + id));
        tarefa.setStatus(tarefa.getStatus().rewind());
        tarefaRepository.save(tarefa);
        return mapDto(tarefa);
    }

    private Tarefa mapEntity(TarefaDTO dto) {
        return Tarefa.builder()
            .id(dto.id())
            .nome(dto.nome())
            .build();
    }
    
    private TarefaDTO mapDto(Tarefa tarefa) {
        return TarefaDTO.builder()
            .id(tarefa.getId())
            .nome(tarefa.getNome())
            .status(tarefa.getStatus())
            .build();
    }
}
