import { Cards } from "../entities/cards";
import { CardsRepository } from "../interfaces/cards.repository";
import { Injectable } from "@angular/core";


export @Injectable({providedIn: 'root'})

class CreateCardUseCase {

    constructor (private repository : CardsRepository) {}

    async execute (name:string, idList:string, desc:string) : Promise <Cards> {

        const card = new Cards();
        card.idList = idList;
        card.name = name;
        card.desc = desc;

        await this.repository.createCard(card);
        return card;

    }
}