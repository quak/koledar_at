import * as React from "react"
 
import { Card, CardContent,CardHeader,CardTitle } from "@/components/ui/card"


import { getEventsForToday } from '../lib/api'
let events = await getEventsForToday();

let eventssl = events.eventssl; 

 
export function Eventgrid() {
  return (
    <div className="grid grid-cols-2 gap-4">

        {eventssl.map((event, index) => (
            <a href="/prireditev/undefined"  key={index}>
            <Card>
            <CardHeader>
                <div className="flex flex-row gap-6">
                            <div className="basis-1/5 flex">
                                <div className="w-20">
                                    <span className="px-2 py-1 flex flex-col border border-black items-center">
                                        <span className="text-xs uppercase tracking-widedate mt-1 ml-1.5 uppercase">{event.daytext}</span>
                                        <span className="text-4xl font-bold  text-black">{event.datedm}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="basis-4/5">
                                <span className="mb-4 block">
                                    <CardTitle>{event.title_sl}</CardTitle>
                                    <h2 className=" text-4xl text-sele-ivory leading-novice hidden">{event.title_sl}</h2>
                                </span>
                            </div>
                        </div>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex flex-row gap-6">
                <div className="basis-1/5 flex">
                    <div className="w-20">
                    <span className="px-2 flex flex-col items-center">
                        <span className="text-2xl font-bold  text-black">{event.starting_at}</span>
                    </span>
                    </div>
                </div>
                <div className="basis-4/5">
                    <span className="mb-4 block">
                    <p className="font-bold text-2xl uppercase  text-black">{event.loc.name_sl}</p>
                    <p className="text-xl  text-black">{event.loc.venuename_sl}</p>
                    </span>
                </div>
                </div>
            </CardContent>        
            </Card>
            </a>
        ))}
      
    </div>
    
    
  )
}