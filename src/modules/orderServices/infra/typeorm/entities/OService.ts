import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import Secretary from '@modules/secretaries/infra/typeorm/entities/Secretary';
import Service from '@modules/servicesOS/infra/typeorm/entities/Service';
import Status from '@modules/statusOS/infra/typeorm/entities/Status';
import Technician from '@modules/technicians/infra/typeorm/entities/Technician';

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
