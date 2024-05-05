import { DataSource } from 'typeorm';

export const databaseProviders = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Root@1234',
      database: 'MIGRATION',
      entities: [__dirname + '/../**/*.entity.ts'],
      synchronize: false,
      driver: 'mysql',
    });

    return dataSource.initialize();
  },
};
