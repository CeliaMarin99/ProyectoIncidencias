package com.celia.backend.incidencias.backend_incidencias.services;

import java.util.List;

import com.celia.backend.incidencias.backend_incidencias.entities.Usuario;

public interface UsuarioServicio {
    
    List<Usuario> findAll();

    Usuario save(Usuario user, String roleName);

    boolean existsByUsername(String username);
}
