package com.celia.backend.incidencias.backend_incidencias.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.celia.backend.incidencias.backend_incidencias.entities.Incidencia;
import com.celia.backend.incidencias.backend_incidencias.entities.Usuario;
import com.celia.backend.incidencias.backend_incidencias.repositories.incidenciaRepositorio;

@Service
public class IncidenciaServiceImpl implements IncidenciaServicio{

    @Autowired
    private incidenciaRepositorio repositorio;

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
    public List<Incidencia> findByTecnico(Usuario tecnico) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByTecnico'");
    }

    @Override
    public List<Incidencia> findByTecnicoIsNull() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByTecnicoIsNull'");
    }


}
