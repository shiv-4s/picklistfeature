import { api, LightningElement, wire } from 'lwc';


export default class Componentc extends LightningElement {
  
    message;

    connectedCallback(){
        console.log("incallback+++++++ ");
    }
     
   
    handleChange(event){
        this.message = event.target.value;
        console.log('message::::::',this.message);
        const selectValue = new CustomEvent("callparent", {
            detail:this.message
        });
        this.dispatchEvent(selectValue);
    }
    
}