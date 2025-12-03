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

    //Obtiene mensajes enviados por el id de la incidencia
    public List<Mensaje> getMensajesEnviadosPorIncidencia(Long idIncidencia, Long idEmisor){
        return repo.findByIncidenciaIdAndEmisorIdOrderByFechaDesc(idIncidencia, idEmisor);
    }

    //Obtiene mensajes recibidos por el id de la incidencia
    public List<Mensaje> getMensajesRecibidosPorIncidencia(Long idIncidencia, Long idReceptor){
        return repo.findByIncidenciaIdAndReceptorIdOrderByFechaDesc(idIncidencia, idReceptor);
    }

    
}