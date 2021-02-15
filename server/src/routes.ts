import { BoravakController } from "./controller/BoravakController";
import { ParkiralisteController } from "./controller/ParkiralisteController";
import { RacunController } from "./controller/RacunController";
import { UserController } from "./controller/UserController";
import { VoziloController } from "./controller/VoziloController";
import { VremeController } from "./controller/VremeController";

export const Routes = [{
    method: "get",
    route: "/user",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/check",
    controller: UserController,
    action: "check"
}, {
    method: "post",
    route: "/register",
    controller: UserController,
    action: "register"
}, {
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login"
}, {
    method: "post",
    route: "/verify",
    controller: UserController,
    action: "verify"
}, {
    method: "post",
    route: "/logout",
    controller: UserController,
    action: "logout"
}, {
    method: "get",
    route: "/racun",
    controller: RacunController,
    action: "all"
}, {
    method: "get",
    route: "/racun/:id",
    controller: RacunController,
    action: "one"
}, {
    method: "post",
    route: "/racun",
    controller: RacunController,
    action: "create"
}, {
    method: "get",
    route: "/parkiraliste",
    controller: ParkiralisteController,
    action: "all"
}, {
    method: "post",
    route: "/parkiraliste",
    controller: ParkiralisteController,
    action: "create"
}, {
    method: "patch",
    route: "/parkiraliste/:id",
    controller: ParkiralisteController,
    action: "update"
}, {
    method: "delete",
    route: "/parkiraliste/:id",
    controller: ParkiralisteController,
    action: "delete"
}, {
    method: "get",
    route: "/vozilo",
    controller: VoziloController,
    action: "all"
}, {
    method: "get",
    route: "/boravak",
    controller: BoravakController,
    action: "all"
}, {
    method: "post",
    route: "/boravak/napusti",
    controller: BoravakController,
    action: "napusti"
}, {
    method: "post",
    route: "/boravak",
    controller: BoravakController,
    action: "create"
}, {
    method: "get",
    route: "/vreme",
    controller: VremeController,
    action: "vreme"
}];