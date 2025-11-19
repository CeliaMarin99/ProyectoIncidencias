export interface Incidencia {
    id?: number;
    titulo: string;
    estado: string;
    lugar: string;
    categoria: string;
    prioridad:string;
    detalles: string;
    photo?:string;
    fecha: string;
    empleado: {
        id: number; // solo necesitas el id del empleado que reporta
        username?: string;
    }
    tecnico?: {
        id: number; // opcional: solo se enviará cuando se asigne un técnico
        username?: string;
    };
}