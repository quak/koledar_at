'use client';
import React from 'react';
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { Card, CardContent,CardHeader,CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react';
import Eventcard from "@/components/Eventcard"

interface EventResponse {
  items: Event[];
  total_count: number;
  offset: number;
  limit: number;
}

interface LocationResponse {
  items: Locations[];
  total_count: number;
  offset: number;
  limit: number;
}


interface OrganizationsResponse {
  items: Organizations[];
  total_count: number;
  offset: number;
  limit: number;
}

interface Event {  
  event_key: string;
  title_de: string;
  title_sl: string;
  venue: string;
  location: string;
}


interface Locations {  
  event_key: string;
  title_de: string;
  title_sl: string;
  venue: string;
  location: string;
}

interface Organizations {  
  event_key: string;
  title_de: string;
  title_sl: string;
  venue: string;
  location: string;
}

const Event = ({ event }: { event: Event }) => {
  
  return (
    <Eventcard event={event}  colortheme="orange"></Eventcard>
  );
};

const InfiniteEvents = () => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [events, setEvents] = React.useState<Event[]>([]);
  const [locations, setLocations] = React.useState<Locations[]>([]);
  const [organizations, setOrganizations] = React.useState<Organizations[]>([]);



  const getbase = async () =>{
    const resloc = await fetch(
      'https://www.koledar.at/v1/locations?includeChildren=true&nofront=1',
    );
    const dataloc = (await resloc.json()) as LocationResponse;
    setLocations(dataloc.items) ;

    const resorga = await fetch(
      'https://www.koledar.at/v1/organizers?offset=0&limit=200',
    );
    const dataorga = (await resorga.json()) as OrganizationsResponse;
    setOrganizations(dataorga.items) ;
  };

  
  if (locations.length == 0) {
    getbase();
  }


    const next = async () => {
      if (locations.length != 0) {
        setLoading(true);

        const res = await fetch(
          `https://www.koledar.at/v1/events?&offset=${3 * page}&from=2024-04-20&limit=3`,
        );
        
        const data = (await res.json()) as EventResponse;
        const datae = enhanceData(data.items,locations,organizations);
        
        setEvents((prev) => [...prev, ...datae["evsl"]]);
        setPage((prev) => prev + 1);

        // Usually your response will tell you if there is no more data.
        if (data.items.length < 3) {
          setHasMore(false);
        }
        setLoading(false);
      }
    };
  
  return (
    <div className=" w-full overflow-y-auto px-4">
      <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event,i) => (
          <Event key={i} event={event} />
        ))}
        <InfiniteScroll hasMore={hasMore} isLoading={loading} next={next} threshold={1}>
          {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
        </InfiniteScroll>
      </div>
    </div>
  );

  

  
  function getLocationforSlug(locationslug,venueslug,kklocations) {
    let ret = false;
   
    kklocations.forEach((locobj,index) => {
        
        if(locationslug===locobj.location_key){
           
            locobj.venues.forEach((vobj,index) => {
                if(venueslug===vobj.venue_key){
                    locobj.venuename_de = vobj.name_de;
                    locobj.venuename_sl = vobj.name_sl;
                }
            });
  
            ret = locobj
        }
    });
  
    return ret;
  }
  
  
  function getOrgas(orgs,kkorganizers) {
   
    let ret = new Array();
  
    kkorganizers.forEach((orgaslug,i)=>{
        kkorganizers.forEach((orga,index) => {
           
            if(orgaslug===orga.organizer_key){
                ret.push(orga);
            }
        });
    });
    
    return ret;
  }
  

  
  function enhanceData(events,kklocations,kkorganizers){

   
    var evsl = new Array();
    var evat = new Array();    
    events.forEach((event,index) => {


        event.index = index
        let actdate = new Date(event.starting_on);
        let enddate = new Date(event.ending_on);
        
        if(enddate!="Invalid Date"){
            event.enddate = enddate.toLocaleDateString();
            event.enddate = event.enddate.replaceAll("/", ".");
        }

        let enddaynumber = enddate.getDate();
        if(enddaynumber.toString().length==1){
            enddaynumber = "0"+enddaynumber;
        }
        event.endday = enddaynumber

        let daynumber = actdate.getDate();
        
        if(daynumber.toString().length==1){
            daynumber = "0"+daynumber;
        }
        event.day = daynumber

        let endyear = enddate.getFullYear();
        let year = actdate.getFullYear();
        let ddetail = daynumber+"."+(actdate.getMonth()+1)+"."+year;
        
        if(enddaynumber){
            ddetail= ddetail +" - "+ enddaynumber+"."+(enddate.getMonth()+1)+"."+endyear
        }
        event.datedetail = ddetail;
        
        const months = ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"];
        const monthsde = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
        event.month = months[actdate.getMonth()];
        event.monthde = monthsde[actdate.getMonth()];

        const day = ["Ned","Pon", "Tor", "Sre", "Čet", "Pet", "Sob" ];
        const dayde = [ "Son","Mon", "Die", "Mit", "Don", "Fre", "Sam"];
        
        event.daytext = day[actdate.getDay()];
        event.daytextde = dayde[actdate.getDay()];
        
        event.datedm = actdate.getDate()+"."+(actdate.getMonth()+1)+".";

        
        if(event.attachments == null){
            event.attachments = [];
        };
        
        if(event.links == null){
            event.links = [];
        };
        
        if(event.organizers == null){
            event.organizers = [];
        };

        let gdate = actdate.getFullYear()+actdate.getMonth()+actdate.getDay();
        
        var startdategcal;
        var enddategcal;
        if(event.starting_at){
            startdategcal = actdate.getFullYear()+""+(actdate.getMonth()+1)+""+actdate.getDate()+"T"+(event.starting_at).replace(":","")+"00";
        }

        if(typeof enddate !== "undefined"){
            enddategcal = enddate.getFullYear()+""+(enddate.getMonth()+1)+""+enddate.getDate()+"T"+enddate.getHours()+""+enddate.getMinutes()+"00";
        }

        if(startdategcal){
            if(!enddategcal){
                enddategcal="";
            }else{
                enddategcal = "/"+enddategcal
            }
            event.gcallink = "https://calendar.google.com/calendar/render?action=TEMPLATE&text="+event.title_sl+"&dates="+startdategcal+enddategcal;
        }

        event.loc = getLocationforSlug(event.location,event.venue,kklocations);
        
        event.orga = getOrgas(event.organizers,kkorganizers);
        

        if(event.title_sl!=""){
            evsl.push(event);
        }
        if(event.title_de!=""){
            evat.push(event);
        }


    });
    var kke = [];
    kke["evsl"] = evsl;
    kke["evat"] = evat;

    return kke;
  }

  

  

};

export default InfiniteEvents;