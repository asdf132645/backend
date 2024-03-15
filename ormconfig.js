"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeOrmOptions = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/user/entities/user.entity");
const proinfo_entity_1 = require("./src/processinfo/entities/proinfo.entity");
const dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'coin',
    password: 'uimd5191!',
    database: 'pb_db2',
    synchronize: false,
    migrations: ['src/migrations/**/*{.ts,.js}'],
    entities: [user_entity_1.User, proinfo_entity_1.ProcessInfo],
    extra: {
        connectionLimit: 10,
        multipleStatements: true,
    },
});
dataSource
    .initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((error) => {
    console.error('Error during Data Source initialization', error);
});
const createTypeOrmOptions = () => __awaiter(void 0, void 0, void 0, function* () {
    yield dataSource.initialize();
    const options = {
        type: dataSource.options.type,
        host: 'localhost',
        port: 3306,
        username: 'coin',
        password: 'uimd5191!',
        database: dataSource.options.database,
        synchronize: dataSource.options.synchronize,
        migrations: dataSource.options.migrations,
        entities: dataSource.options.entities,
        extra: dataSource.options.extra,
    };
    return options;
});
exports.createTypeOrmOptions = createTypeOrmOptions;
//# sourceMappingURL=ormconfig.js.map