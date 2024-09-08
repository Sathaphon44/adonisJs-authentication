/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller';
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js';
import DashboardController from '#controllers/dashboard_controller';

router.group(() => {

    router.group(() => {

        router.post("/signIn", [AuthController, "SignIn"]);
        router.post("/signUp", [AuthController, "SignUp"]);

    }).prefix("/auth");

    router.group(() => {

        router.get("/", [DashboardController, "index"])
        router.get("/usersManagement", [DashboardController, "index"])

    }).prefix('/admin').use(middleware.admin())


    router.group(() => {

        router.get("/", [DashboardController, "index"])

    }).prefix('/dashboard').use(middleware.user());


    // router.group(() => {
    //     router.get("/", async ({ auth }) => {
    //         const user = await auth.authenticate()
    //         const userDetail = user.toJSON();
    //         return userDetail.username;
    //     })
    // }).prefix('/test/auth');



}).prefix("/api");
