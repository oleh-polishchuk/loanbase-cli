module.exports.interfaceTemplate = ({ modelName }) => {
    return `\
export interface I${modelName} {
  id: number
}

`
};
