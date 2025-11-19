package com.celia.backend.incidencias.backend_incidencias.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.celia.backend.incidencias.backend_incidencias.entities.Incidencia;
import com.celia.backend.incidencias.backend_incidencias.services.IncidenciaServicio;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    //Editar Incidencia
    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editar(@RequestBody Incidencia i, @PathVariable Long id) {
      
         Optional<Incidencia> incidenciaOptional = servicio.update(id, i);

        if(incidenciaOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.CREATED).body(incidenciaOptional.orElseThrow());
        }
        
        return ResponseEntity.notFound().build();
    }
    
    //Buscar incidencia por id
    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok(servicio.findById(id));
    }

    //Eliminar incidencia
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){

        Optional<Incidencia> incidenciaOptional = servicio.delete(id);

       if(incidenciaOptional.isPresent()){
            return ResponseEntity.ok(incidenciaOptional.orElseThrow());
       }

       return ResponseEntity.notFound().build();
    }

    //Buscar inciencia por palabra clave
    @GetMapping("/search/{palabraClave}")
    public List<Incidencia> buscarPorPalabraClave(@PathVariable String palabraClave){
        return servicio.findAll(palabraClave);
    }

    //Obtener incidencias del tecnico
    @GetMapping("/tecnico/{id}")
    public ResponseEntity<List<Incidencia>> getIncidenciasPorTecnico(@PathVariable Long id) {
        return ResponseEntity.ok(servicio.findByTecnico_Id(id));
    }

    //Obtener incidencias sin tecnico asignado
    @GetMapping("/sin-tecnico")
    public ResponseEntity<List<Incidencia>> getIncidenciasSinTecnico() {
        return ResponseEntity.ok(servicio.findByTecnicoIsNull());
    }

    //Asignar tecnico a incidencia
    @PutMapping("/asignar-tecnico/{idIncidencia}/tecnico/{idTecnico}")
    public ResponseEntity<?> asignarTecnicoAIncidencia(@PathVariable Long idIncidencia, @PathVariable Long idTecnico) {
        Optional<Incidencia> incidenciaOptional = servicio.asignarTecnico(idIncidencia, idTecnico);

        if(incidenciaOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.CREATED).body(incidenciaOptional.orElseThrow());
        }
        
        return ResponseEntity.notFound().build();
    }
}
