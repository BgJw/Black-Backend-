import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerNumber, CustomerSchema } from "./schema/customer.schema";
import { DataHubController } from "./dataHub.controller";
import { DataHubService } from "./dataHub.service";


@Module({
    imports: [ MongooseModule.forFeature([{ name: CustomerNumber.name, schema: CustomerSchema },])],
    controllers: [DataHubController ],
    providers: [DataHubService],

})

export class DataHubModule {}