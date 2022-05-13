export class Inspeccion{
    constructor(
        public id:number,
        public proyecto_id:number,
        public user_id:number,
        public numero:number,
        public fecha:string,
        public observaciones:string,
        public firma:string,
        public avance_obra:number,
        public porcentaje_pagado:number,
        public tareas_ejecutadas:number
    ){}
}