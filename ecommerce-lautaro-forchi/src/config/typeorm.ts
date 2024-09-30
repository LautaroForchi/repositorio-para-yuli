import { registerAs } from '@nestjs/config';
import {config as dotenvConfig} from 'dotenv';

import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({path: '.development.env'});

const config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoandEntities: true,
    synchronize: true,// solo tienen en true cuando estamos en Desarrollo
    dropSchema: true,// solo tienen en true cuando estamos en Desarrollo
}

export default registerAs('typeorm',()=> config) // exporta la configuracion. donde dice 'typeorm' es un nombre de clave

export const connectionSoucer = new DataSource( config as DataSourceOptions) // aca estoy creando una instancia de DataSource con la configuracion de config