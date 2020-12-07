const fs = require('fs');
const path = require('path');
const { decamelize } = require("../common/utils");
const { execSync } = require('child_process');

const { capitalizeFirstLetter } = require("../common/utils");
const { entityTemplate } = require("../templates/entity.template");
const { interfaceTemplate } = require("../templates/interface.template");


module.exports.run = (modelName = "", options = {}) => {
    const MODELS_DIR = 'apps/loanbase-backend/src/models';

    const modelDir = path.resolve(MODELS_DIR, decamelize(modelName));
    if (fs.existsSync(modelDir)) {
        return console.log(`Model ${modelDir} already exists!`);
    } else {
        fs.mkdirSync(modelDir, { recursive: true });
    }

    const entitiesDir = path.resolve(modelDir, 'entities');
    fs.mkdirSync(entitiesDir);
    console.log('entitiesDir', entitiesDir)

    const entityPath = path.resolve(entitiesDir, `${decamelize(modelName)}.entity.ts`);
    fs.writeFileSync(entityPath, entityTemplate({
        modelName: modelName
    }), { flag: 'wx' });

    const interfacesDir = path.resolve(modelDir, 'interfaces');
    fs.mkdirSync(interfacesDir);

    const interfacePath = path.resolve(interfacesDir, `${decamelize(modelName)}.interface.ts`);
    fs.writeFileSync(interfacePath, interfaceTemplate({
        modelName: modelName
    }), { flag: 'wx' });

    execSync(`git add .`);

    console.log(`Created ${entityPath}`);
    console.log(`Created ${interfacePath}`);
};
