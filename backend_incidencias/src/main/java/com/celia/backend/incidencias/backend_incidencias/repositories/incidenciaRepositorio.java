package com.celia.backend.incidencias.backend_incidencias.repositories;

import org.springframework.data.repository.CrudRepository;

import com.celia.backend.incidencias.backend_incidencias.entities.Incidencia;
import com.celia.backend.incidencias.backend_incidencias.entities.Usuario;

import java.util.List;


public interface incidenciaRepositorio extends CrudRepository<Incidencia, Long>{

     //Devuelve todas las incidencias creadas por un empleado concreto
    List<Incidencia> findByEmpleado_Id(Long Idempleado);

    //Devuelve todas las incidencias asignadas a un técnico concreto
    List<Incidencia> findByTecnico(Usuario tecnico);

    List<Incidencia> findByTecnicoIsNull();//incidencias que no tienen tecnico


}
