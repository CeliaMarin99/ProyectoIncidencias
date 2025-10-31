package com.celia.backend.incidencias.backend_incidencias.services;

import java.util.List;

import com.celia.backend.incidencias.backend_incidencias.entities.Usuario;

public interface UsuarioServicio {
    
    List<Usuario> findAll();

    Usuario findByUsername(String username);

    Usuario save(Usuario user);

    boolean existsByEmail(String email);
}
