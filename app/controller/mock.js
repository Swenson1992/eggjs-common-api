'use strict';
module.exports = app => {
    class MockController extends app.Controller {
        show() {
            this.ctx.success(this.ctx.swaggerSpec);
            // this.ctx.body = this.ctx.swaggerSpec;
        }
    }
    return MockController;
};