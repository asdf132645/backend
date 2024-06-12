"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeOrmOptions = void 0;
const user_entity_1 = require("./src/user/entities/user.entity");
const cell_entity_1 = require("./src/settings/analysisDatabse/cellImgAnalyzed/entities/cell.entity");
const rbcDegree_entity_1 = require("./src/settings/analysisDatabse/rbcDegree/rbcDegree.entity");
const wbcCustomClass_entity_1 = require("./src/settings/analysisDatabse/wbcCustomClass/wbcCustomClass.entity");
const wbcHotKeys_entity_1 = require("./src/settings/analysisDatabse/wbcHotKeys/wbcHotKeys.entity");
const bfHotKeys_entity_1 = require("./src/settings/analysisDatabse/bhHotKeys/bfHotKeys.entity");
const normalRange_entity_1 = require("./src/settings/analysisDatabse/normalRange/normalRange.entity");
const imagePrint_entity_1 = require("./src/settings/report/imagePrint/imagePrint.entity");
const lisCodeWbc_entity_1 = require("./src/settings/report/lisCode/wbc/lisCodeWbc.entity");
const lisCodeRbc_entity_1 = require("./src/settings/report/lisCode/rbc/lisCodeRbc.entity");
const cbcCode_entity_1 = require("./src/settings/report/cbcCode/cbcCode.entity");
const filePathSetEntity_1 = require("./src/settings/report/filrPathSet/filePathSetEntity");
const wbcRunCount_entity_1 = require("./src/settings/report/runInfoCount/wbcRunCount.entity");
const minCount_entity_1 = require("./src/settings/report/minCount/minCount.entity");
const category_entity_1 = require("./src/settings/analysisDatabse/rbcDegree/category.entity");
const runingInfo_entity_1 = require("./src/runingInfo/runingInfo.entity");
const classOrder_1 = require("./src/classOrder/classOrder");
const dotenv = require("dotenv");
const device_entity_1 = require("./src/device/device.entity");
dotenv.config();
const createTypeOrmOptions = async () => {
    const options = {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: false,
        migrations: ['src/migrations/**/*{.ts,.js}'],
        entities: [
            user_entity_1.User,
            cell_entity_1.CellImgAnalyzed,
            rbcDegree_entity_1.RbcDegree,
            wbcCustomClass_entity_1.WbcCustomClass,
            wbcHotKeys_entity_1.WbcHotKeys,
            bfHotKeys_entity_1.BfHotKeys,
            normalRange_entity_1.NormalRange,
            imagePrint_entity_1.ImagePrintEntity,
            lisCodeWbc_entity_1.LisCodeWbcEntity,
            lisCodeRbc_entity_1.LisCodeRbcEntity,
            cbcCode_entity_1.CbcCodeEntity,
            filePathSetEntity_1.FilePathSetEntity,
            wbcRunCount_entity_1.WbcRunCountEntity,
            minCount_entity_1.MinCountEntity,
            category_entity_1.Category,
            runingInfo_entity_1.RuningInfoEntity,
            classOrder_1.ClassOrder,
            device_entity_1.DeviceEntity,
        ],
        extra: {
            connectionLimit: 10,
            multipleStatements: true,
        },
    };
    return options;
};
exports.createTypeOrmOptions = createTypeOrmOptions;
//# sourceMappingURL=ormconfig.js.map