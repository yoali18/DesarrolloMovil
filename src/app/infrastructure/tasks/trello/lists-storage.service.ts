import { Injectable } from "@angular/core";
import { Boards } from "src/app/core/trello/entities/boards";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ListsRepository } from "src/app/core/trello/interfaces/lists.repository";
import { Lists } from "src/app/core/trello/entities/lists";
import { GetBoardUseCase } from "src/app/core/trello/use-cases/get-board.use-case";

@Injectable({providedIn: 'root'})

export class ListsStorageService implements ListsRepository{

    urlTrello = "https://api.trello.com/1/boards/"

    httpHeader = {
        headers: new HttpHeaders({ "Accept": "application/json" }),
    }

    constructor(
        public http: HttpClient,
        public getBoardUseCase: GetBoardUseCase
    ){}

    createList(lists: Lists): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async getLists(): Promise<Lists[]> {

        const idBoard = await this.getBoardUseCase.execute()

        const httpParams = new HttpParams()
            .set("key", "5c4647691476ec73e9780af54188890c")
            .set("token", "ATTA7f6793d2ead32a3c89d89cc68918e519fc096cd012250cea86cc1675a5b16a1eF465E5D4")
    
        return this.http.get<Lists[]>(this.urlTrello + idBoard + "/lists", { params: httpParams, headers: { "Accept": "application/json" }})
            .toPromise()
            .then((response) => {
                const listNames = response?.map((list) => list.name);
                return response;
            })
            .catch((error) => {
                console.log(error)
                return error
            });
    }

    updateList(id: string, updatedBoards: Lists): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    deleteList(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}