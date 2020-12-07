const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const { capitalizeFirstLetter } = require("../common/utils");
const { entityTemplate } = require("../templates/entity.template");
const { interfaceTemplate } = require("../templates/interface.template");


module.exports.run = (modelName = "", options = {}) => {
    const MODELS_DIR = 'apps/loanbase-backend/src/models';

    const modelDir = path.resolve(MODELS_DIR, modelName);
    if (fs.existsSync(modelDir)) {
        return console.log(`Model ${modelDir} already exists!`);
    } else {
        fs.mkdirSync(modelDir, { recursive: true });
    }

    const entitiesDir = path.resolve(modelDir, 'entities');
    fs.mkdirSync(entitiesDir);
    console.log('entitiesDir', entitiesDir)

    const entityPath = path.resolve(entitiesDir, `${modelName}.entity.ts`);
    fs.writeFileSync(entityPath, entityTemplate({
        modelName: capitalizeFirstLetter(modelName)
    }), { flag: 'wx' });

    const interfacesDir = path.resolve(modelDir, 'interfaces');
    fs.mkdirSync(interfacesDir);

    const interfacePath = path.resolve(interfacesDir, `${modelName}.interface.ts`);
    fs.writeFileSync(interfacePath, interfaceTemplate({
        modelName: capitalizeFirstLetter(modelName)
    }), { flag: 'wx' });

    execSync(`git add .`);

    console.log(`Created ${entityPath}`);
    console.log(`Created ${interfacePath}`);
};
