package com.celia.backend.incidencias.backend_incidencias.controllers;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.celia.backend.incidencias.backend_incidencias.entities.Usuario;
import com.celia.backend.incidencias.backend_incidencias.services.UsuarioServicio;
import org.springframework.web.bind.annotation.PutMapping;


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

    @PostMapping("/registrar/{rol}") //Registro de usuario
    public ResponseEntity<?> register(@PathVariable String rol, @Valid  @RequestBody Usuario user, BindingResult result) {
        user.setAdmin(false);
      
        //service.save(user); //guarda el usuario con rol USER por defecto

        //return ResponseEntity.ok(Map.of("mensaje", "Usuario registrado correctamente"));
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(user, rol));
    }

    //Devuelve el usuario autenticado
    @GetMapping("/usuario-actual")
    public ResponseEntity<?> obtenerUsuarioActual(Authentication authentication) {
        String username = (String) authentication.getPrincipal(); // <--- el principal es un String
        return ResponseEntity.status(HttpStatus.OK).body(service.findByUsername(username));
    }

    //Busca un usuario por su nombre de usuario
    @GetMapping("/username/{username}")
    public ResponseEntity<Usuario> getByUsername(@PathVariable String username) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.findByUsername(username));    
    }

    //Editar información del usuario
    @PutMapping("editar/{id}")
    public ResponseEntity<Usuario> editarUsusario(@PathVariable Long id, @RequestBody Usuario user) {
        
        return ResponseEntity.status(HttpStatus.OK).body(service.update(id, user).orElseThrow());  
    }

    //Eliminar usuario
   @DeleteMapping("eliminar/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){

    Optional<Usuario> usuario = service.delete(id);

    if (usuario.isPresent()) {
        Map<String, String> respuesta = new HashMap<>();
        respuesta.put("message", "Usuario eliminado correctamente");
        return ResponseEntity.ok(respuesta);
    }

        return ResponseEntity.notFound().build();
    }

}
