import { LightningElement } from 'lwc';

export default class Componenta extends LightningElement {
    valueFromChild;

    getChildValue(event){
        console.log("getChildC::::::::");
        console.log("data::::::::",event.detail);
        this.valueFromChild = event.detail;
    }
}