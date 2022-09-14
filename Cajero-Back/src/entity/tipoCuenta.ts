import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class TipoCuenta{
    
    @PrimaryGeneratedColumn()
    id_tipo_cuenta: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string; 

}