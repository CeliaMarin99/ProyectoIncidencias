package com.celia.backend.incidencias.backend_incidencias.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.celia.backend.incidencias.backend_incidencias.entities.Mensaje;

public interface MensajeRepositorio extends JpaRepository<Mensaje, Long> {

    List<Mensaje> findByReceptorIdOrderByFechaDesc(Long receptorId);

    List<Mensaje> findByEmisorIdOrderByFechaDesc(Long emisorId);

    //Buscar mensajes enviados por incidencia
    List<Mensaje> findByIncidenciaIdAndEmisorIdOrderByFechaDesc(long idIncidencia, Long idEmisor);

    //Buscar mensajes recibidos por incidencia
    List<Mensaje> findByIncidenciaIdAndReceptorIdOrderByFechaDesc(long idIncidencia, Long idEmisor);

}

