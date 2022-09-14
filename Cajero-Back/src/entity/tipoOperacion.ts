import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class TipoOperacion{
    
    @PrimaryGeneratedColumn()
    id_tipo_operacion: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string; 

}