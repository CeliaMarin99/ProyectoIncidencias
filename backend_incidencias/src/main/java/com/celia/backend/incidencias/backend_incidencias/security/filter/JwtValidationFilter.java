package com.celia.backend.incidencias.backend_incidencias.security.filter;

import static com.celia.backend.incidencias.backend_incidencias.security.TokenJwtConfig.CONTENT_TYPE;
import static com.celia.backend.incidencias.backend_incidencias.security.TokenJwtConfig.HEADER_AUTHORIZATION;
import static com.celia.backend.incidencias.backend_incidencias.security.TokenJwtConfig.PREFIX_TOKEN;
import static com.celia.backend.incidencias.backend_incidencias.security.TokenJwtConfig.SECRET_KEY;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.celia.backend.incidencias.backend_incidencias.security.SimpleGrantedAuthorityJsonCreator;
//import com.andres.curso.springboot.app.springbootcrud.security.SimpleGrantedAuthorityJsonCreator;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtValidationFilter extends BasicAuthenticationFilter {

    public JwtValidationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String header = request.getHeader(HEADER_AUTHORIZATION);//Obtiene el header Authorization para tener el token

        if (header == null || !header.startsWith(PREFIX_TOKEN)) {
            chain.doFilter(request, response);
            return;
        }
        String token = header.replace(PREFIX_TOKEN, "");//Obtiene el token sin el prefijo Bearer


        //El try catch maneja el error en caso de que el token sea invalido
        try {
            Claims claims = Jwts.parser().verifyWith(SECRET_KEY).build().parseSignedClaims(token).getPayload();
            String usename = claims.getSubject();//recupera el username de los claims
            // String usename2 = (String) claims.get("username");
            Object authoritiesClaims = claims.get("authorities");//recupera los roles de los claims

           
            //Convierte los roles en una coleccion de GrantedAuthority
            Collection<? extends GrantedAuthority> authorities = Arrays.asList(
                    new ObjectMapper()
                .addMixIn(SimpleGrantedAuthority.class, 
                                    SimpleGrantedAuthorityJsonCreator.class)
                .readValue(authoritiesClaims.toString().getBytes(), SimpleGrantedAuthority[].class)
                );
            


            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(usename, null, authorities);//valida el token
            SecurityContextHolder .getContext().setAuthentication(authenticationToken);
            chain.doFilter(request, response);

        } catch (JwtException e) {
            Map<String, String> body = new HashMap<>();
            body.put("error", e.getMessage());
            body.put("message", "El token JWT es invalido!");

            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(CONTENT_TYPE);
        }
    }

}