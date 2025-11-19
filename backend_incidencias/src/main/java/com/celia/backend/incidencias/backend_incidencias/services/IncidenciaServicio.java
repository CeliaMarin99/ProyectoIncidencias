package com.celia.backend.incidencias.backend_incidencias.services;

import java.util.List;
import java.util.Optional;

import com.celia.backend.incidencias.backend_incidencias.entities.Incidencia;

public interface IncidenciaServicio {

    Incidencia save(Incidencia incidencia);

    List<Incidencia> findByEmpleado_Id(Long Idempleado);

    List<Incidencia> findByTecnico_Id(Long id);

    List<Incidencia> findByTecnicoIsNull();

    //modificar incidencia
    Optional<Incidencia> update(Long id, Incidencia i);

    List<Incidencia> findAll(String palabraClave);

    Optional<Incidencia> findById(Long id);

    Optional<Incidencia> delete(Long id);

    Optional<Incidencia> asignarTecnico(Long idIncidencia, Long idTecnico);
}
