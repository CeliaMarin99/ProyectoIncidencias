package com.celia.backend.incidencias.backend_incidencias.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.celia.backend.incidencias.backend_incidencias.entities.Usuario;

public interface UsuarioRepositorio extends CrudRepository<Usuario, Long>{
    boolean existsByEmail(String email);

    Optional<Usuario> findByEmail(String email);
}