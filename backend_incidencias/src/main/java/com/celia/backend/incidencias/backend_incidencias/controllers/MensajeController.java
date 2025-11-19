package com.celia.backend.incidencias.backend_incidencias.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.celia.backend.incidencias.backend_incidencias.entities.Mensaje;
import com.celia.backend.incidencias.backend_incidencias.services.MensajeService;

@RestController
@RequestMapping("/mensajes")
@CrossOrigin(origins = "http://localhost:4200", originPatterns = "*")
public class MensajeController {

    @Autowired
    private MensajeService servicio;

    @PostMapping("/enviar")
    public ResponseEntity<Mensaje> enviarMensaje(@RequestBody Mensaje msg) {
        return ResponseEntity.ok(servicio.enviarMensaje(msg));
    }

    @GetMapping("/recibidos/{userId}")
    public ResponseEntity<List<Mensaje>> recibidos(@PathVariable Long userId) {
        return ResponseEntity.ok(servicio.getMensajesRecibidos(userId));
    }

    @GetMapping("/enviados/{userId}")
    public ResponseEntity<List<Mensaje>> enviados(@PathVariable Long userId) {
        return ResponseEntity.ok(servicio.getMensajesEnviados(userId));
    }

    @GetMapping("/incidencia/{idIncidencia}")
    public ResponseEntity<List<Mensaje>> porIncidencia(@PathVariable Long idIncidencia) {
        return ResponseEntity.ok(servicio.getMensajesPorIncidencia(idIncidencia));
    }
}

