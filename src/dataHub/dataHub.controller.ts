import { Controller, Get, Post } from "@nestjs/common";
import { DataHubService } from "./dataHub.service";

@Controller('dataHub')
export class DataHubController {
    constructor(private readonly dataHubService: DataHubService) {}

    @Get('customerNumber')
    async getCustomerNumber() {
        const customerNumber = await this.dataHubService.getCustomerNumber();
        return { customerNumber };
    }
    @Post('customerNumber')
    async incrementCustomerNumber() {
        const customerNumber = await this.dataHubService.incrementCustomerNumber();
        return {customerNumber};
    }

    //end customerNumber
}
