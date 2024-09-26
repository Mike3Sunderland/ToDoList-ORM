package com.todolist.ToDoList.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.todolist.ToDoList.model.Tarea;
public interface TareaRepository extends JpaRepository<Tarea,Long> {

}
