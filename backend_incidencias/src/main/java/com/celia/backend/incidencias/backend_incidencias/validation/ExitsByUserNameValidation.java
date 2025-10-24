package com.celia.backend.incidencias.backend_incidencias.validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.celia.backend.incidencias.backend_incidencias.services.UsuarioServicio;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class ExitsByUserNameValidation implements ConstraintValidator<ExistsByUsername, String> {

    @Autowired
    private UsuarioServicio servicio;

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        return !servicio.existsByEmail(username);
    }

}
