import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, ManyToOne } from "typeorm";
import * as bcrypt from "bcryptjs"
@Entity()
export class Usuarios{
    @PrimaryGeneratedColumn()
    id_usuarios: number;

    @Column()
    nombres: string;

    @Column()
    apellidos: string; 

    @Column()
    no_identificacion: string;

    @Column()
    tp_identificacion: string;

    @Column()
    password: string;

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }
}