import { NgModule } from "@angular/core";

export interface IProduct {
    id: number,
    quantityTotal: number,
    productTitle: string,
    booked: number,
    price: number 
}