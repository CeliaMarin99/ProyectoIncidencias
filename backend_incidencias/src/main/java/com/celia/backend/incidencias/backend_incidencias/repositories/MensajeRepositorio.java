package com.celia.backend.incidencias.backend_incidencias.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.celia.backend.incidencias.backend_incidencias.entities.Mensaje;

public interface MensajeRepositorio extends JpaRepository<Mensaje, Long> {

    List<Mensaje> findByReceptorIdOrderByFechaEnvioDesc(Long receptorId);

    List<Mensaje> findByEmisorIdOrderByFechaEnvioDesc(Long emisorId);

    List<Mensaje> findByIncidenciaIdOrderByFechaEnvioAsc(Long incidenciaId);
}

