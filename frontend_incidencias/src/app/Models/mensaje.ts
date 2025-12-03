export interface mensaje {
    id?: number;
    contenido: string;
    fecha: string;
    receptor: {
        id: number; // solo necesitas el id del empleado que reporta
        username?: string;
    }
    emisor: {
        id: number; // opcional: solo se enviará cuando se asigne un técnico
        username?: string;
    }
    incidencia?: {
        id: number; // opcional: solo se enviará cuando se asigne un técnico
    };

}