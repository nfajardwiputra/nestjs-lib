"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
const common_1 = require("@nestjs/common");
const PaginationDTO_1 = require("../dto/response/PaginationDTO");
const ErrorMessageDTO_1 = require("../dto/response/ErrorMessageDTO");
const ResponseErrorDTO_1 = require("../dto/response/ResponseErrorDTO");
const ResponseSuccessSingleDTO_1 = require("../dto/response/ResponseSuccessSingleDTO");
const ResponseSuccessCollectionDTO_1 = require("../dto/response/ResponseSuccessCollectionDTO");
let ResponseService = exports.ResponseService = class ResponseService {
    responseCode(statusCode) {
        var _a, _b;
        return (`${(_a = process.env.PROJECT_NAME) !== null && _a !== void 0 ? _a : ''}` +
            `-${(_b = process.env.SERVICE_NAME) !== null && _b !== void 0 ? _b : ''}` +
            `-${statusCode.toString()}`);
    }
    error(statusCode, messages, error) {
        return ResponseErrorDTO_1.ResponseErrorDTO.Builder()
            .response_schema({
            response_code: this.responseCode(statusCode),
            response_message: error,
        })
            .response_output({
            errors: messages,
        })
            .build();
    }
    successCollection(content, pagination, message = 'Success') {
        return ResponseSuccessCollectionDTO_1.ResponseSuccessCollectionDTO.Builder()
            .response_schema({
            response_code: this.responseCode(common_1.HttpStatus.OK),
            response_message: message,
        })
            .response_output({
            list: {
                pagination: pagination !== null && pagination !== void 0 ? pagination : PaginationDTO_1.PaginationDTO.Builder()
                    .size(content.length)
                    .total(content.length)
                    .build(),
                content,
            },
        })
            .build();
    }
    success(content, message = 'Success') {
        return ResponseSuccessSingleDTO_1.ResponseSuccessSingleDTO.Builder()
            .response_schema({
            response_code: this.responseCode(common_1.HttpStatus.OK),
            response_message: message,
        })
            .response_output({
            detail: content,
        })
            .build();
    }
    throwError(error) {
        var _a, _b, _c;
        if ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.response_schema) === null || _b === void 0 ? void 0 : _b.response_code) {
            throw new common_1.BadRequestException(error.response);
        }
        if ((_c = error.response_schema) === null || _c === void 0 ? void 0 : _c.response_code) {
            throw new common_1.BadRequestException(error);
        }
        throw new common_1.BadRequestException(this.error(common_1.HttpStatus.INTERNAL_SERVER_ERROR, [ErrorMessageDTO_1.ErrorMessageDTO.Builder().message(error.message).build()], 'Internal Server Error'));
    }
};
exports.ResponseService = ResponseService = __decorate([
    (0, common_1.Injectable)()
], ResponseService);
//# sourceMappingURL=ResponseService.js.map