package com.celia.backend.incidencias.backend_incidencias.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.celia.backend.incidencias.backend_incidencias.entities.Mensaje;

public interface MensajeRepositorio extends JpaRepository<Mensaje, Long> {

    List<Mensaje> findByReceptorIdOrderByFechaDesc(Long receptorId);

    List<Mensaje> findByEmisorIdOrderByFechaDesc(Long emisorId);

    List<Mensaje> findByIncidenciaIdOrderByFechaAsc(Long incidenciaId);
}

