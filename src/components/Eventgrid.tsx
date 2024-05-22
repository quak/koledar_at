import * as React from "react"
 
import { Card, CardContent,CardHeader,CardTitle } from "@/components/ui/card"

type Locations = {  
  event_key: string;
  title_de: string;
  title_sl: string;
  venue: string;
  location: string;
  venuename_sl: string;
  name_sl: string;

}

type Event = {  
  event_key: string;
  title_de: string;
  title_sl: string;
  venue: string;
  location: string;
  datedm: string;
  starting_at: string;
  image_landscape_thumbnail: string;
  image_portrait: string;
  image_portrait_thumbnail: string;
  daytext: string;
  loc: Locations;
}

type ApiResponse = {
  eventssl: Event[],
  eventsat: Event[]
}




import { getEventsForToday } from '../lib/api'
import Eventcardday from "./Eventcardday";
const events = await getEventsForToday() as any;
console.log("events EVENTGRID");
console.log(events);
let eventssl = events.eventssl; 

 
export function Eventgrid() {
  return (
    <div className="grid grid-cols-2 gap-4">

        {eventssl.map((event, index) => (
            <Eventcardday event={event}  colortheme="orange" className="test"></Eventcardday>
        ))}
      
    </div>
    
  )
}