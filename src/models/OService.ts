import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import Client from './Client';
import Secretary from './Secretary';
import Service from './Service';
import Status from './Status';
import Technician from './Technician';

@Entity('os')
class OService {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    clientIDFK: string;

    @ManyToOne(() => Client)
    @JoinColumn({ name: 'clientIDFK' })
    client: Client;

    @ManyToOne(() => Technician)
    @JoinColumn({ name: 'technicianIDFK' })
    @Column()
    technicianIDFK: string;

    @ManyToOne(() => Secretary)
    @JoinColumn({ name: 'secretaryIDFK' })
    @Column()
    secretaryIDFK: string;

    @ManyToOne(() => Service)
    @JoinColumn({ name: 'serviceIDFK' })
    @Column()
    serviceIDFK: string;

    @Column()
    obsSecretary: string;

    @Column()
    obsTechnician: string;

    @ManyToOne(() => Status)
    @JoinColumn({ name: 'statusIDFK' })
    @Column()
    statusIDFK: string;

    @Column('boolean')
    isClosed: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    startedAt: Date;

    @CreateDateColumn()
    finishedAt: Date;
}

export default OService;
