package com.celia.backend.incidencias.backend_incidencias.services;

import java.util.List;

import com.celia.backend.incidencias.backend_incidencias.entities.Incidencia;
import com.celia.backend.incidencias.backend_incidencias.entities.Usuario;

public interface IncidenciaServicio {

    Incidencia save(Incidencia incidencia);

    List<Incidencia> findByEmpleado_Id(Long Idempleado);

    List<Incidencia> findByTecnico(Usuario tecnico);

    List<Incidencia> findByTecnicoIsNull();

    //eliminar incidencia

    //modificar incidencia
}
