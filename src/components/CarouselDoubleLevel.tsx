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

import { getUpcommingThisWeek } from '../lib/api'
let events = await getUpcommingThisWeek();

let eventssl = events.eventssl;


export function CarouselDoubleLevel() {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1 ">

        {eventssl.map((eventdouble, index) => (
          <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
            
            {eventdouble.map((event, i) => (
        
              <Eventcard event={event} colortheme="green"  key={i}></Eventcard>
            
            ))}    

          </CarouselItem>
        ))}

      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}