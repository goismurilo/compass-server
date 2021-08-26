import { container } from 'tsyringe';

import '@modules/technicians/providers';

import IOServicesRepository from '@modules/orderServices/repositories/IOServicesRepository';
import OServicesRepository from '@modules/orderServices/infra/typeorm/repositories/OServicesRepository';

import ITechniciansRepository from '@modules/technicians/repositories/ITechniciansRepository';
import TechniciansRepository from '@modules/technicians/infra/typeorm/repositories/TechniciansRepository';

container.registerSingleton<IOServicesRepository>(
    'OServicesRepository',
    OServicesRepository,
);

container.registerSingleton<ITechniciansRepository>(
    'TechniciansRepository',
    TechniciansRepository,
);
