package com.celia.backend.incidencias.backend_incidencias.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.celia.backend.incidencias.backend_incidencias.entities.Incidencia;
import com.celia.backend.incidencias.backend_incidencias.services.IncidenciaServicio;

@RestController
@RequestMapping("/incidencias")
@CrossOrigin(origins = "http://localhost:4200")
public class IncidenciaController {

    @Autowired
    private IncidenciaServicio servicio;

    @GetMapping
    public List<Incidencia> listar() {
        return servicio.findAll();
    }

    @GetMapping("/empleado/{id}")
    public ResponseEntity<List<Incidencia>> getIncidenciasPorEmpleado(@PathVariable Long id) {
        return ResponseEntity.ok(servicio.findByEmpleado_Id(id));
    }

    // ---------------------- CREAR INCIDENCIA CON FOTO ---------------------------
    @PostMapping(value = "/crear", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> crearIncidencia(
            @RequestPart("incidencia") Incidencia incidencia,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) throws IOException {

        if (file != null && !file.isEmpty()) {
            String nombreArchivo = UUID.randomUUID() + "_" + file.getOriginalFilename();

            // Carpeta donde se guardará la imagen (puedes cambiar la ruta)
            Path uploadDir = Paths.get("public/img");
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            Path filePath = uploadDir.resolve(nombreArchivo);
            Files.copy(file.getInputStream(), filePath);

            incidencia.setPhoto(nombreArchivo);
        }

        Incidencia nueva = servicio.save(incidencia);
        return ResponseEntity.status(HttpStatus.CREATED).body(nueva);
    }

    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editar(@RequestBody Incidencia i, @PathVariable Long id) {
        Optional<Incidencia> incidenciaOptional = servicio.update(id, i);
        return incidenciaOptional.isPresent()
                ? ResponseEntity.status(HttpStatus.CREATED).body(incidenciaOptional.get())
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok(servicio.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Incidencia> incidenciaOptional = servicio.delete(id);

        return incidenciaOptional.isPresent()
                ? ResponseEntity.ok("Incidencia eliminada correctamente")
                : ResponseEntity.notFound().build();
    }

    @GetMapping("/search/{palabraClave}")
    public List<Incidencia> buscarPorPalabraClave(@PathVariable String palabraClave){
        return servicio.findByPalabraClave(palabraClave);
    }

    @GetMapping("/tecnico/{id}")
    public ResponseEntity<List<Incidencia>> getIncidenciasPorTecnico(@PathVariable Long id) {
        return ResponseEntity.ok(servicio.findByTecnico_Id(id));
    }

    @GetMapping("/sin-tecnico")
    public ResponseEntity<List<Incidencia>> getIncidenciasSinTecnico() {
        return ResponseEntity.ok(servicio.findByTecnicoIsNull());
    }

    @PutMapping("/asignar-tecnico/{idIncidencia}/tecnico/{idTecnico}")
    public ResponseEntity<?> asignarTecnico(@PathVariable Long idIncidencia, @PathVariable Long idTecnico) {
        Optional<Incidencia> incidenciaOptional = servicio.asignarTecnico(idIncidencia, idTecnico);

        return incidenciaOptional.isPresent()
                ? ResponseEntity.status(HttpStatus.CREATED).body(incidenciaOptional.get())
                : ResponseEntity.notFound().build();
    }
}

