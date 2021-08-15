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

    @Column()
    technicianIDFK: string;

    @ManyToOne(() => Technician)
    @JoinColumn({ name: 'technicianIDFK' })
    technician: Technician;

    @Column()
    secretaryIDFK: string;

    @ManyToOne(() => Secretary)
    @JoinColumn({ name: 'secretaryIDFK' })
    secretary: Secretary;

    @Column()
    serviceIDFK: string;

    @ManyToOne(() => Service)
    @JoinColumn({ name: 'serviceIDFK' })
    service: Service;

    @Column()
    obsSecretary: string;

    @Column()
    obsTechnician: string;

    @Column()
    statusIDFK: string;

    @ManyToOne(() => Status)
    @JoinColumn({ name: 'statusIDFK' })
    status: Status;

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
