
import axios from "axios";
//helper function for fetching key from server

// import { API_URL } from './Config';
const API_URL = process.env.SERVER_DOMAIN;
// const API_URL = process.env.LOCAL_DOMAIN;
export async function fetchPublickKey(){
    try {
        console.log("Fetching key...");
        //fetch key from route
        const response = await axios.get(`${API_URL}config`,{
          headers:{
            'Content-Type': 'application/json'
          }
        })

        console.log("From helper:", response.data);
        // const {stripePublishableKey} = await response.json();
        const {stripePublishableKey} = await response.data; 
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

