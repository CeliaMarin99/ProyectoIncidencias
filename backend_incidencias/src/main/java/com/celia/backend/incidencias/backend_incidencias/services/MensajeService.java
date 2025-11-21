package com.celia.backend.incidencias.backend_incidencias.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.celia.backend.incidencias.backend_incidencias.entities.Mensaje;
import com.celia.backend.incidencias.backend_incidencias.repositories.MensajeRepositorio;

@Service
public class MensajeService {

    @Autowired
    private MensajeRepositorio repo;

    public Mensaje enviarMensaje(Mensaje msg) {
        msg.setFecha(LocalDateTime.now());
        return repo.save(msg);
    }

    //Obtiene los mensajes recibidos por un usuario específico, ordenados por fecha descendente
    public List<Mensaje> getMensajesRecibidos(Long userId) {
        return repo.findByReceptorIdOrderByFechaDesc(userId);
    }

    //Obtiene los mensajes enviados por un usuario específico, ordenados por fecha descendente
    public List<Mensaje> getMensajesEnviados(Long userId) {
        return repo.findByEmisorIdOrderByFechaDesc(userId);
    }

    //Obtiene los mensajes asociados a una incidencia específica, ordenados por fecha ascendente
    public List<Mensaje> getMensajesPorIncidencia(Long incidenciaId) {
        return repo.findByIncidenciaIdOrderByFechaAsc(incidenciaId);
    }
}