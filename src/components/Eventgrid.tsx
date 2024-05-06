import * as React from "react"
 
import { Card, CardContent,CardHeader,CardTitle } from "@/components/ui/card"


import { getEventsForToday } from '../lib/api'
import Eventcardday from "./Eventcardday";
let events = await getEventsForToday();

let eventssl = events.eventssl; 

 
export function Eventgrid() {
  return (
    <div className="grid grid-cols-2 gap-4">

        {eventssl.map((event, index) => (
            <Eventcardday event={event}  colortheme="orange"></Eventcardday>
        ))}
      
    </div>
    
  )
}