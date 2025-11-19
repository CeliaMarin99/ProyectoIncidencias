package com.celia.backend.incidencias.backend_incidencias.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.celia.backend.incidencias.backend_incidencias.entities.Incidencia;

import java.util.List;



public interface incidenciaRepositorio extends CrudRepository<Incidencia, Long>{

     //Devuelve todas las incidencias creadas por un empleado concreto
    List<Incidencia> findByEmpleado_Id(Long Idempleado);

    //Devuelve todas las incidencias asignadas a un técnico concreto
    List<Incidencia> findByTecnico_Id(Long id);

    List<Incidencia> findByTecnicoIsNull();//incidencias que no tienen tecnico

    //Buscar por palabra clave
    @Query("SELECT i FROM Incidencia i WHERE CONCAT(i.id, i.prioridad, i.categoria, i.lugar, i.estado, i.categoria) LIKE %?1%")
	List<Incidencia> findAll(String palabraClave);

    


}
