import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne } from "typeorm";
import { Usuarios } from "./usuario";
import { Productos } from "./productos";
import { TipoCuenta } from "./tipoCuenta";

@Entity()
export class Cuentas{
    @PrimaryGeneratedColumn()
    id_cuenta: number;

    @ManyToOne(() => TipoCuenta, (TipoCuenta) => TipoCuenta.id_tipo_cuenta,{cascade: false}) @JoinColumn({name: 'tipo_cuenta_id', referencedColumnName: 'id_tipo_cuenta'})
    @Column()
    tipo_cuenta_id: number;

    @ManyToOne(() => Usuarios, (Usuarios) => Usuarios.id_usuarios,{cascade: false}) @JoinColumn({name: 'usuario_id', referencedColumnName: 'id_usuarios'})
    @Column()
    usuario_id: number; 

    @Column()
    saldo: number;

    @ManyToOne(() => Productos, (Productos) => Productos.id_producto,{cascade: false}) @JoinColumn({name: 'productos_id', referencedColumnName: 'id_producto'})
    @Column()
    productos_id: number;

}