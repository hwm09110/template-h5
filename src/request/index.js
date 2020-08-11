// 所有接口出口
let requireRouteFilePaths = require.context('./', true, /^.\/.*\/.*\.js$/)
let apiArr = requireRouteFilePaths.keys()
                  .map(routeFilePath => requireRouteFilePaths(routeFilePath)["default"])
                  .reduce((prev,next) => prev.concat(next), []);

let allApi = {};
apiArr.forEach(item => {
  Object.assign(allApi, item);
});
console.log('allApi', allApi);

export default  allApi;

