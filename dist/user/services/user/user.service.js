"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entity/user.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
        this.users = [];
    }
    async create(users) {
        const result = await this.userRepo.query("SELECT * FROM `flight` WHERE `flight_id` = ? LIMIT 1", [users.flight_id]);
        if (result[0]) {
            const find_seat = await this.userRepo.query("SELECT * FROM `flight_seats` WHERE `flight_id` = ?", [result[0].flight_id]);
            if (find_seat[0]) {
                for (let i = 0; i < 5; i++) {
                    if (find_seat[i].seat === 'Empty') {
                        await this.userRepo.query("UPDATE `flight_seats` SET `seat` = ? WHERE `id` = ? AND `flight_id` = ?", [users.user_id, find_seat[i].id, users.flight_id]);
                        if (users.triptype === 'oneway') {
                            users.return = 'NULL';
                        }
                        else if (users.triptype === 'return') {
                            const find_return_flight = await this.userRepo.query("SELECT * FROM `flight` WHERE `flight_id` = ?", [users.flight_id]);
                            if (find_return_flight) {
                                users.return = find_return_flight[0].return;
                            }
                        }
                        this.userRepo.save(users);
                        return JSON.stringify({ flight_id: users.flight_id, seat_id: find_seat[i].id, user_id: users.user_id });
                    }
                }
            }
        }
        return;
    }
    loadAll() {
        return this.userRepo.find();
    }
    async updateTime(users) {
        const isFlightEmpty = this.userRepo.query("SELECT * FROM `flight` WHERE `flight_id` = ? LIMIT 1", [users.flight_id]);
        if (isFlightEmpty) {
            const findSeat = await this.userRepo.query("SELECT * FROM `flight_seats` WHERE `flight_id` = ?", [users.flight_id]);
            if (findSeat) {
                for (let i = 0; i < 10; i++) {
                    if (findSeat[i].seat === 'Empty') {
                        const findUserFlightID = await this.userRepo.query("SELECT * FROM `user` WHERE `user_id` = ?", [users.user_id]);
                        if (findUserFlightID) {
                            await this.userRepo.query("UPDATE `flight_seats` SET `seat` = 'Empty' WHERE `seat` = ? AND `flight_id` = ?", [users.user_id, findUserFlightID[0].flight_id]);
                            await this.userRepo.query("UPDATE `flight_seats` SET `seat` = ? WHERE `id` = ? AND `flight_id` = ?", [users.user_id, findSeat[i].id, users.flight_id]);
                            await this.userRepo.query("UPDATE `user` SET `flight_id` = ?, `departure` = ?, `return` = ? WHERE `user_id` = ?", [users.flight_id, users.departure, users.return, users.user_id]);
                            return JSON.stringify({ flight_id: users.flight_id, seat_id: findSeat[i].id, user_id: users.user_id });
                        }
                    }
                }
            }
        }
    }
    async deleteflight(users) {
        const findUser = await this.userRepo.findOne({
            user_id: users.user_id
        });
        if (findUser) {
            const findflightseat = await this.userRepo.query("SELECT * FROM `flight_seats` WHERE `seat` = ? AND `flight_id` = ?", [users.user_id, findUser.flight_id]);
            if (findflightseat) {
                await this.userRepo.query("UPDATE `flight_seats` SET `seat` = 'Empty' WHERE `seat` = ? AND `flight_id` = ?", [users.user_id, findUser.flight_id]);
                return await this.userRepo.remove(findUser);
            }
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map