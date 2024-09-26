package com.todolist.ToDoList.controller;

import com.todolist.ToDoList.model.Tarea;
import com.todolist.ToDoList.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tareas")
public class TareaController {
    @Autowired
    private TareaService tareaService;

    @GetMapping
    public List<Tarea> listarTareas(){
        return tareaService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarea> obtenerTarea(@PathVariable Long id) {
        Optional<Tarea> tarea = tareaService.obtenerPorId(id);
        return tarea.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Tarea crearTarea(@RequestBody Tarea tarea) {
        return tareaService.guardarTarea(tarea);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarea> actualizarTarea(@PathVariable Long id, @RequestBody Tarea tareaActualizada) {
        Optional<Tarea> tareaOptional = tareaService.obtenerPorId(id);

        if (!tareaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Tarea tarea = tareaOptional.get();
        tarea.setTitulo(tareaActualizada.getTitulo());
        tarea.setDescripcion(tareaActualizada.getDescripcion());
        tarea.setCompletada(tareaActualizada.isCompletada());

        tareaService.guardarTarea(tarea);

        return ResponseEntity.ok(tarea);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTarea(@PathVariable Long id) {
        if (!tareaService.obtenerPorId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        tareaService.eliminarTarea(id);
        return ResponseEntity.noContent().build();
    }
}
