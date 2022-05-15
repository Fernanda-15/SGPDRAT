export class Comentario{
    constructor(
        public id:number,
        public proyecto_id:number,
        public contenido:string,
        public created_at:string
    ){}
}