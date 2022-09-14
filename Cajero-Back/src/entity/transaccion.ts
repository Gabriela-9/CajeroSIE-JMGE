import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne } from "typeorm";
import { TipoOperacion } from "./tipoOperacion";
import { Cuentas } from "./cuentas";

@Entity()
export class Transaccion{
    @PrimaryGeneratedColumn()
    id_transaccion: number;

    @ManyToOne(() => TipoOperacion, (TipoOperacion) => TipoOperacion.id_tipo_operacion,{cascade: false}) @JoinColumn({name: 'tipo_operacion_id', referencedColumnName: 'id_tipo_operacion'})
    @Column()
    tipo_operacion_id: number;

    @Column()
    monto: number; 

    @ManyToOne(() => Cuentas, (Cuentas) => Cuentas.id_cuenta,{cascade: false}) @JoinColumn({name: 'cuenta_open_id', referencedColumnName: 'id_cuenta'})
    @Column()
    cuenta_open_id: number;

    @ManyToOne(() => Cuentas, (Cuentas) => Cuentas.id_cuenta,{cascade: false}) @JoinColumn({name: 'cuenta_end_id', referencedColumnName: 'id_cuenta'})
    @Column()
    cuenta_end_id: number;

}