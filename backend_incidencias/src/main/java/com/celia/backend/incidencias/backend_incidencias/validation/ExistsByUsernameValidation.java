package com.celia.backend.incidencias.backend_incidencias.validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.celia.backend.incidencias.backend_incidencias.services.UsuarioServicio;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class ExistsByUsernameValidation implements ConstraintValidator<ExistsByUsername, String>{

   @Autowired
    private UsuarioServicio service;

    public ExistsByUsernameValidation() {}

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        if (service == null) {
            return true;
        }
        return !service.existsByUsername(username);
    }
}
