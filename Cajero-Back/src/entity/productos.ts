import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Productos{
    @PrimaryGeneratedColumn()
    id_producto: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string; 

    @Column()
    estado: string;

}