import { EntityRepository, Repository } from 'typeorm';
import OService from '../modules/OrderServices/entities/OService';

@EntityRepository(OService)
// eslint-disable-next-line prettier/prettier
class OServicesRepository extends Repository<OService> { }

export default OServicesRepository;
