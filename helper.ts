//helper function for fetching key from server

import { API_URL } from './Config';
export async function fetchPublickKey(){
    try {
        console.log("Fetching key...");
        //fetch key from route
        const response = await fetch(`${API_URL}/config`);

        const {stripePublishableKey} = await response.json();
        console.log("fetched:", stripePublishableKey);

        return stripePublishableKey;

    } catch (error) {
        
        console.error("Error fetching publishable key:", error);
    }
}

export function sanitizeLineItems(lineItems:Array<any>){

    //reformat line items as {item1.id:{qty:##}, item2.id:{qty:##},...}
    return(lineItems.reduce((data:any, lineItem:any)=>{
      
      const item = data;

      item[lineItem.id] = {
        quantity: lineItem.quantity,
      }
      console.log("sanitized items:", item);
      return item;
    },{}))
  }

