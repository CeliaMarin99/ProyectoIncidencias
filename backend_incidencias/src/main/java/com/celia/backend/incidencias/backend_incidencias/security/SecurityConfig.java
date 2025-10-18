package com.celia.backend.incidencias.backend_incidencias.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        return http.authorizeHttpRequests((authz) -> authz
        .requestMatchers("/users", "/users/registrar").permitAll()
        .anyRequest().authenticated())
        .csrf(config -> config.disable())//solo para vistas
        .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))//sin estado porque la sesion se guarda en token
            .build();
    }
}
