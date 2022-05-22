export class Pago{
    constructor(
        public id:number,
        public proyecto_id:number,
        public numero:number,
        public proyeccion:number,
        public monto:number,
        public justificacion:string,
        public numero_transaccion:string
    ){}
}