package com.todolist.ToDoList.service;

import com.todolist.ToDoList.model.Tarea;
import com.todolist.ToDoList.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TareaService {

    @Autowired
    private TareaRepository tareaRepository;

    public List<Tarea> obtenerTodas(){
        return tareaRepository.findAll();
    }

    public Optional<Tarea> obtenerPorId(Long id){
        return tareaRepository.findById(id);
    }

    public Tarea guardarTarea(Tarea tarea){
        return tareaRepository.save(tarea);
    }

    public void  eliminarTarea(Long id){
        tareaRepository.deleteById(id);
    }
}
