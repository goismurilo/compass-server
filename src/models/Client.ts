import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('client')
class OService {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    cpf: string;

    @Column()
    rg: string;

    @Column()
    phone: string;

    @Column()
    cep: string;

    @Column()
    city: string;

    @Column()
    district: string;

    @Column()
    street: string;

    @Column()
    number: string;

    @Column()
    referencePoint: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}

export default OService;
