let path = require('path')

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1513779989145_1674'

  // add your config here
  // 加载 errorHandler 中间件
  config.middleware = [ 'errorHandler' ]

  // 只对 /api 前缀的 url 路径生效
  // config.errorHandler = {
  //   match: '/api',
  // }

  config.static = {
    prefix: '/public/',
    fileDir: [path.join(appInfo.root, './app/public/uploads/')],
    dir: [path.join(appInfo.root, './public/swagger')],
  };

  config.swagger = {
    enable: true,
    swaggerDefinition: {
      info: {
        // API informations (required)
        title: 'eggjs通用框架', // Title (required)
        version: '1.0.0', // Version (required)
        base: '/api/v1',
        description: 'eggjs api', // Description (optional)
      },
    },
    apis: [ path.resolve(appInfo.root, 'app/controller/*.js'), path.resolve(appInfo.root, 'app/controller/*/*.js'), path.resolve(appInfo.root, 'app/service/*.js'), path.resolve(appInfo.root, 'app/service/*/*.js') ],
  };

//   swaggerMock配置项
  config.swaggerMock = {
    enable: true,
    parameters: {
      response: 'httpStatus',
      checkMock: 'debugger'
    },
    match(ctx) {
      return ctx.query.hasOwnProperty([ config.swaggerMock.parameters.checkMock ]);
    }
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: false
    },
    domainWhiteList: [ '*' ],
  }

  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  config.multipart = {
    fileExtensions: [ '.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov', '.db', '.ncx' ], // 增加对 .apk 扩展名的支持
  }

  config.bcrypt = {
    saltRounds: 10 // default 10
  }

  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: '/jwt', // optional
  }

  return config
}
