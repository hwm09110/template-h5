// 所有接口出口
let requireRouteFilePaths = require.context('./', true, /^.\/.*\/.*\.js$/)
let allApi = requireRouteFilePaths.keys()
                  .map(routeFilePath => requireRouteFilePaths(routeFilePath)["default"])
                  .reduce((prev,next) => prev.concat(next));

console.log('allApi', allApi);

export default  allApi

