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
    public Usuario save(Usuario user, String rol) {//Metodo para guardar un usuario

        Optional<Rol> optionalRoleUser = roleRepository.findByName("ROLE_"+rol);
        List<Rol> roles = new ArrayList<>();

        optionalRoleUser.ifPresent(roles::add);


        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user);
    }

    @Transactional
    public Optional<Usuario> update(Long id, Usuario user) {

    Optional<Usuario> userOptional = repository.findById(id);

    if (userOptional.isPresent()) {

            Usuario userDB = userOptional.get();

            // Actualizar datos básicos
            userDB.setUsername(user.getUsername());
            userDB.setEmail(user.getEmail());
            userDB.setLastName(user.getLastName());
            userDB.setName(user.getName());
            userDB.setPhone(user.getPhone());

            // Si la contraseña NO viene vacía → actualizar
            if (user.getPassword() != null && !user.getPassword().isBlank()) {
                userDB.setPassword(passwordEncoder.encode(user.getPassword()));
            }

            /* ---------------------------------------------------------
            GESTIÓN DE ROLES (añadir/quitar ADMIN)
            --------------------------------------------------------- */

            List<Rol> rolesActuales = userDB.getRoles();
            
            // Buscar ROLE_ADMIN en la BD
            Optional<Rol> optionalRoleAdmin = roleRepository.findByName("ROLE_ADMIN");

                if (user.isAdmin()) {
                    // Si admin == true → añadir ROLE_ADMIN si no está
                    optionalRoleAdmin.ifPresent(roleAdmin -> {
                        if (!rolesActuales.contains(roleAdmin)) {
                            rolesActuales.add(roleAdmin);
                        }
                    });
                } else {
                    // Si admin == false → eliminar ROLE_ADMIN si está
                    optionalRoleAdmin.ifPresent(roleAdmin -> rolesActuales.remove(roleAdmin));
                }

                userDB.setRoles(rolesActuales);

                return Optional.of(repository.save(userDB));
            }

            return Optional.empty();
    }


    @Override
    public Usuario findByUsername(String username) {
        return repository.findByUsername(username).orElse(null);
    }

    @Override
    public Usuario findById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Transactional
    @Override
    public Optional<Usuario> delete(Long id) {
        //Comprobar si existe el producto
        Optional<Usuario> user = repository.findById(id);
        
        user.ifPresent(userDB -> {
            repository.delete(userDB);
        });

        return user;
        
    }

    @Override
    public boolean existsByUsername(String username) {
       return repository.existsByUsername(username);
    }
    
}
