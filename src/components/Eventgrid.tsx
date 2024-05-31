import * as React from "react"
 
import { Card, CardContent,CardHeader,CardTitle } from "@/components/ui/card"


import { getEventsForToday } from '../lib/api'
import Eventcardday from "./Eventcardday";

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
  image_landscape: string;
  image_portrait: string;
  image_portrait_thumbnail: string;
  daytext: string;
  loc: Locations;
  loca: Loco;
}

type ApiResponse = {
  eventssl: Event[],
  eventsat: Event[]
}
interface EventResponse {
  items: Event[];
  total_count: number;
  offset: number;
  limit: number;
}

interface Organizations {  
  event_key: string;
  title_de: string;
  title_sl: string;
  venue: string;
  location: string;
}


interface Loco {
  venuename_de: string;
  venuename_sl: string;
  name_sl: string;
  name_de: string;
}

 
function Eventgrid({ searchword,place }: { searchword: string,place:string }) {  
  const [events, setEvents] = React.useState<Event[]>([]);
  const [locations, setLocations] = React.useState<Locations[]>([]);
  const [organizations, setOrganizations] = React.useState<Organizations[]>([]);
  const [initcall, setInitcall] =  React.useState(true)


  const getbase = async () =>{
    let res: any = "";
    if(searchword !== "" || place !== ""){
      let sq= "";
      if(searchword !== ""){
        sq=sq+"&q="+searchword;
      }
      if(place !== ""){
        sq=sq+"&locations="+place;
      }

      var today = new Date();
      var str = "";
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      str = yyyy+"-"+mm+"-"+dd;

      res = await fetch(
        `https://admin.koledar.at/v1/events?&offset=0&limit=30${sq}&from=${str}`,
      );
      const data = (await res.json()) as EventResponse;
      const datae = enhanceData(data.items,locations,organizations);
      setEvents(datae["evsl"]);
    }else{
      res = await getEventsForToday() as any;
      setEvents(res["eventssl"] as Event[]);
    }
  };

  
  if (initcall) {
    setInitcall(false);
    getbase();
  }
  

  let eventssl = [];//events.eventssl;

  return (
    <div >
    {events.length!=0 && (
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {events.map((event, index) => (
                <Eventcardday event={event} colortheme="orange" className="test" key={index}></Eventcardday>
            ))}
          
        </div>
        
     )
    }
    </div>
    
  )


  function enhanceData(events,kklocations,kkorganizers){

   
    var evsl = new Array();
    var evat = new Array();    
    events.forEach((event,index) => {


        event.index = index
        let actdate = new Date(event.starting_on);
        let enddate = new Date(event.ending_on);
        
        if(!isNaN(enddate.getDay())){
            event.enddate = enddate.toLocaleDateString();
            event.enddate = event.enddate.replaceAll("/", ".");
        }

        let enddaynumber = enddate.getDate();
        let enddaynumberstring ="";
        if(enddaynumber.toString().length==1){
          enddaynumberstring = "0"+enddaynumber;
        }
        event.endday = enddaynumber

        let daynumber = actdate.getDate();
        let daynumberstring ="";
        
        if(daynumber.toString().length==1){
          daynumberstring = "0"+daynumber;
        }
        event.day = daynumber

        let endyear = enddate.getFullYear();
        let year = actdate.getFullYear();
        let ddetail = daynumberstring+"."+(actdate.getMonth()+1)+"."+year;
        
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

  function getLocationforSlug(locationslug,venueslug,kklocations) {
    let ret:Loco={  
      venuename_de: "",
      venuename_sl: "",
      name_sl: "",
      name_de: ""
    };
   
    kklocations.forEach((locobj,index) => {
        
        if(locationslug===locobj.location_key){
           
            locobj.venues.forEach((vobj,index) => {
                if(venueslug===vobj.venue_key){
                  ret.venuename_de = vobj.name_de;
                  ret.venuename_sl = vobj.name_sl;
                  ret.name_de = locobj.name_de;
                  ret.name_sl = locobj.name_sl;

                }
            });
  
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
};

export default Eventgrid;