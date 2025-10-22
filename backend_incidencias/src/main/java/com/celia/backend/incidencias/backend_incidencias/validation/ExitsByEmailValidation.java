package com.celia.backend.incidencias.backend_incidencias.validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.celia.backend.incidencias.backend_incidencias.services.UsuarioServicio;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class ExitsByEmailValidation implements ConstraintValidator<ExistsByEmail, String> {

    @Autowired
    private UsuarioServicio servicio;

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return !servicio.existsByEmail(email);
    }

}
