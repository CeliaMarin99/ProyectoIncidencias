package com.celia.backend.incidencias.backend_incidencias.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.celia.backend.incidencias.backend_incidencias.entities.Rol;

public interface RolRepositorio extends CrudRepository<Rol, Long> {

    Optional<Rol> findByNombre(String nombre);
    
}
