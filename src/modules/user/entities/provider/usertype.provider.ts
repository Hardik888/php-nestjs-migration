import { DataSource } from 'typeorm';

import { UserTypeDetails } from '../usertype.entity';

export const userTypeProvider = {
  provide: 'USERTYPE_REPOSITORY',
  useFactory: (dataSource: DataSource) =>
    dataSource.getRepository(UserTypeDetails),
  inject: ['DATA_SOURCE'],
};
