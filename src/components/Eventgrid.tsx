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

let eventssl = events.eventssl; 

 
export function Eventgrid() {
  return (
    <div className="mt-4">
    {eventssl.length!=0 && (
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mb-32">
        
        <h2 id="today" className="hyphens-auto text-kkred text-3xl md:text-5xl text-center uppercase font-light mb-12">danes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {eventssl.map((event, index) => (
                <Eventcardday event={event}  colortheme="orange" className="test" key={index}></Eventcardday>
            ))}
          
        </div>
        
      </div>)
    }
    </div>
    
  )
}