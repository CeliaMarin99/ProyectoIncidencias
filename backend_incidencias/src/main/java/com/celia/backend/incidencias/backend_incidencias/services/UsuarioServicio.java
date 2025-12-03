package com.celia.backend.incidencias.backend_incidencias.services;

import java.util.List;
import java.util.Optional;

import com.celia.backend.incidencias.backend_incidencias.entities.Usuario;

public interface UsuarioServicio {
    
    List<Usuario> findAll();

    Usuario findByUsername(String username);

    Usuario findById(Long id);

    Usuario save(Usuario user, String rol);

    Optional<Usuario> update(Long id, Usuario user);

    Optional<Usuario> delete(Long id);

    boolean existsByUsername(String username);

}
