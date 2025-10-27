package com.celia.backend.incidencias.backend_incidencias.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.celia.backend.incidencias.backend_incidencias.entities.Rol;
import com.celia.backend.incidencias.backend_incidencias.entities.Usuario;
import com.celia.backend.incidencias.backend_incidencias.repositories.RolRepositorio;
import com.celia.backend.incidencias.backend_incidencias.repositories.UsuarioRepositorio;

@Service
public class UsuarioServicioImpl implements UsuarioServicio{

    @Autowired
    private UsuarioRepositorio repository;

    @Autowired
    private RolRepositorio roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public List<Usuario> findAll() {//Metodo para listar todos los usuarios
        return (List<Usuario>) repository.findAll();
    }

    @Override
    @Transactional
    public Usuario save(Usuario user) {//Metodo para guardar un usuario

        Optional<Rol> optionalRoleUser = roleRepository.findByName("ROL_USUARIO");
        List<Rol> roles = new ArrayList<>();

        optionalRoleUser.ifPresent(roles::add);

        if (user.isAdmin()) {
            Optional<Rol> optionalRoleAdmin = roleRepository.findByName("ROL_ADMIN");
            optionalRoleAdmin.ifPresent(roles::add);
        }

        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }

    @Override
    public boolean existsByEmail(String username) {
        return repository.existsByUsername(username);
    }
    
}
