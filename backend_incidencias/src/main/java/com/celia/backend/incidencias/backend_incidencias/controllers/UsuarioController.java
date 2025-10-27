package com.celia.backend.incidencias.backend_incidencias.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.celia.backend.incidencias.backend_incidencias.entities.Usuario;
import com.celia.backend.incidencias.backend_incidencias.services.UsuarioServicio;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200", originPatterns = "*")
public class UsuarioController {

    @Autowired
    private UsuarioServicio service;

    @GetMapping //Lista todos los usuarios
    public List<Usuario> listar() {
        return service.findAll();
    }

    @PostMapping("/registrar") //Registro de usuario
    public ResponseEntity<?> register(@Valid @RequestBody Usuario user, BindingResult result) {
        user.setAdmin(false);
      
        //service.save(user); //guarda el usuario con rol USER por defecto

        //return ResponseEntity.ok(Map.of("mensaje", "Usuario registrado correctamente"));
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(user));
    }
}
