package com.celia.backend.incidencias.backend_incidencias.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.celia.backend.incidencias.backend_incidencias.entities.Incidencia;
import com.celia.backend.incidencias.backend_incidencias.entities.Usuario;
import com.celia.backend.incidencias.backend_incidencias.repositories.UsuarioRepositorio;
import com.celia.backend.incidencias.backend_incidencias.repositories.incidenciaRepositorio;

@Service
public class IncidenciaServiceImpl implements IncidenciaServicio{

    @Autowired
    private incidenciaRepositorio repositorio;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Override
    @Transactional
    public Incidencia save(Incidencia incidencia) {
        return repositorio.save(incidencia);
    }

    @Override
    @Transactional
    public List<Incidencia> findByEmpleado_Id(Long Idempleado) {
               
        return repositorio.findByEmpleado_Id(Idempleado);
    }

    @Override
    public List<Incidencia> findByTecnico_Id(Long id) {
        return repositorio.findByTecnico_Id(id);
    }

    @Override
    public List<Incidencia> findByTecnicoIsNull() {
        return repositorio.findByTecnicoIsNull();
    }

    @Override
    @Transactional
    public Optional<Incidencia> update(Long id, Incidencia i) {

         Optional<Incidencia> incidencia = repositorio.findById(id);
        
        if(incidencia.isPresent()) {
            Incidencia incidenciaDB = incidencia.orElseThrow();
            incidenciaDB.setTitulo(i.getTitulo());
            incidenciaDB.setDetalles(i.getDetalles());
            incidenciaDB.setCategoria(i.getCategoria());
            incidenciaDB.setFecha(i.getFecha());
            incidenciaDB.setEstado(i.getEstado());
            incidenciaDB.setPrioridad(i.getPrioridad());
            incidenciaDB.setEmpleado(i.getEmpleado());
            incidenciaDB.setTecnico(i.getTecnico());


            return Optional.of(repositorio.save(incidenciaDB));
        };

        return incidencia;
        
    }

   
    @Override
    public Optional<Incidencia> findById(Long id) {
       return repositorio.findById(id);
    }

    @Transactional
    @Override
    public Optional<Incidencia> delete(Long id) {
        //Comprobar si existe el producto
        Optional<Incidencia> incidencia = repositorio.findById(id);
        
        incidencia.ifPresent(incienciaDB -> {
            repositorio.delete(incienciaDB);
        });

        return incidencia;
        
    }

    @Override
    public List<Incidencia> findByPalabraClave(String palabraClave) {
        return repositorio.findByPalabraClave(palabraClave);
    }

    @Override
    public Optional<Incidencia> asignarTecnico(Long idIncidencia, Long idTecnico) {
        
        Optional<Incidencia> incidencia = repositorio.findById(idIncidencia);
        Optional<Usuario> tecnico = usuarioRepositorio.findById(idTecnico);

        if(incidencia.isPresent() && tecnico.isPresent()) {
            Incidencia incidenciaDB = incidencia.orElseThrow();
            incidenciaDB.setTecnico(tecnico.orElseThrow());
            
            return Optional.of(repositorio.save(incidenciaDB));
        }
        return incidencia;
    }

    @Override
    public List<Incidencia> findAll() {
        return (List<Incidencia>) repositorio.findAll();
    }
    
    

}
