import * as React from "react"
 
import { Card, CardContent,CardHeader,CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Eventcard from "@/components/Eventcard"
 
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
  loca: Loco;
}

interface Loco {
  venuename_de: string;
  venuename_sl: string;
  name_sl: string;
  name_de: string;
}


type ApiResponse = {
  eventssl: Event[],
  eventsat: Event[]
}

import { getUpcommingThisWeek } from '../lib/api'
let events = await getUpcommingThisWeek()  as any;;

let eventssl = events.eventssl;

export function CarouselOneLevel() {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-8 mb-32 mt-4">
			<h2 id="thisweek" className="hyphens-auto text-kkred text-3xl md:text-5xl text-center uppercase font-light  mb-12">Ta teden</h2>
    <Carousel className="w-full  overflow-hidden">
      <CarouselContent className="-ml-1 ">
      {eventssl.map((event, i) => (


          <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <Eventcard event={event} colortheme="" className="eventcarditem"  key={i}></Eventcard>
          
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

		</div>
  )
}