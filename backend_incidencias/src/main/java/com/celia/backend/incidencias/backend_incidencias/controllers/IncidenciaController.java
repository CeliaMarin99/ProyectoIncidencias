package com.celia.backend.incidencias.backend_incidencias.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.celia.backend.incidencias.backend_incidencias.entities.Incidencia;
import com.celia.backend.incidencias.backend_incidencias.entities.Usuario;
import com.celia.backend.incidencias.backend_incidencias.services.IncidenciaServicio;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/incidencias")
@CrossOrigin(origins = "http://localhost:4200", originPatterns = "*")
public class IncidenciaController {

    @Autowired
    public IncidenciaServicio servicio;

    //Devolver todas las incidencias de un empleado
     @GetMapping("/empleado/{id}")
    public ResponseEntity<List<Incidencia>> getIncidenciasPorEmpleado(@PathVariable Long id) {
        return ResponseEntity.ok(servicio.findByEmpleado_Id(id));
    }

    //Crear Incidencia
    @PostMapping("/crear")
    public ResponseEntity<?> crear(@Valid @RequestBody Incidencia incidencia, BindingResult result) {
         return ResponseEntity.status(HttpStatus.CREATED).body(servicio.save(incidencia));
    }
    
    
}
