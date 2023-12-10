'use strict';
import * as userHandler from "../controllers/userController.js"

export const UserRoutes = (app) => {
    // var userHandlers = require('../controllers/userController.js');
    // todoList Routes
    app.route('/tasks')
        .post(userHandler.loginRequired, userHandler.profile);
    app.route('/auth/register')
        .post(userHandler.register);
   app.route('/auth/sign_in')
        .post(userHandler.sign_in);
};