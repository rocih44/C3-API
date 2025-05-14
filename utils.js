const _= require("lodash")

const myFunction= (arr) => {
    return _.flatten(arr)
};

const ultimo= (arr) => {
    return _.last(arr);
}
module.exports = {myFunction, ult : ultimo }/*clave valor*/