package com.celia.backend.incidencias.backend_incidencias.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.celia.backend.incidencias.backend_incidencias.entities.Usuario;
import com.celia.backend.incidencias.backend_incidencias.repositories.UsuarioRepositorio;


@Service
public class JpaUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepositorio repository;

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Optional<Usuario> userOptional = repository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException(String.format("Email %s no existe en el sistema!", email));
        }

        Usuario user = userOptional.orElseThrow();

        List<GrantedAuthority> authorities = user.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority(role.getNombre()))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(user.getEmail(), 
        user.getPassword(), 
        user.isEnabled(),
        true,
        true,
        true,
                authorities);
    }
    
}
