export class Proyecto{
    constructor(
        public id:number,
        public user_id:number,
        public numero_contratacion:string,
        public nombre:string,
        public objetivo:string,
        public ubicacion:string,
        public fecha_inicio:string,
        public fecha_final:string,
        public forma_pago:string,
        public monto_adjudicado:number
    ){}
}