const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = `hi, 欢迎访问eggjs通用API! A optimized Node.js RESTful API Server based on egg.js.`
  }
}

module.exports = HomeController
