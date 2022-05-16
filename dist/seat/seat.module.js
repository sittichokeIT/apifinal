"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatModule = void 0;
const common_1 = require("@nestjs/common");
const seat_controller_1 = require("./controller/seat/seat.controller");
const seat_service_1 = require("./service/seat/seat.service");
let SeatModule = class SeatModule {
};
SeatModule = __decorate([
    (0, common_1.Module)({
        controllers: [seat_controller_1.SeatController],
        providers: [seat_service_1.SeatService]
    })
], SeatModule);
exports.SeatModule = SeatModule;
//# sourceMappingURL=seat.module.js.map