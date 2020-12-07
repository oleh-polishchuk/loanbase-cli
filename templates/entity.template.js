module.exports.entityTemplate = ({ modelName }) => {
    return `\
import { PrimaryGeneratedColumn } from 'typeorm'

export default class ${modelName} implements I${modelName} {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number

}

`
};
