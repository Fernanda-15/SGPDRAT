export class Tarea{
    constructor(
        public id:number,
        public proyecto_id:number,
        public numero:number,
        public descripcion:string,
        public peso:number,
        public avance:number,
        public fecha_inicio:string,
        public fecha_final:string
    ){}    
}
