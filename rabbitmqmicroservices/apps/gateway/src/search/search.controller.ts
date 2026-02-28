import { Controller, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller("search")
export class SearchHttpController {
    constructor(
        @Inject("SEARCH_CLIENT") private readonly searchClient: ClientProxy
    ) { }


    async search(query: string) {
        return this.searchClient.send({ cmd: "search.product" }, { name: query }).toPromise();
    }
}