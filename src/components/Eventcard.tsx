
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
 
 
type CardProps = React.ComponentProps<typeof Card>

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

type TcardProps = {
  event: Event
  colortheme: string
  className: string
  
};

type Locations = {  
  event_key: string;
  title_de: string;
  title_sl: string;
  venue: string;
  location: string;
  venuename_sl: string;
  name_sl: string;
}


export default function Eventcard({ className, ...props }: TcardProps) {
  let event = props.event;
  let colortheme = props.colortheme;
  
  let url = "/event/"+event.event_key;
  let colorclass = "green";

  if(colortheme == "orange"){
    colorclass = "bg-kkorange"
  }else{
    colorclass = "bg-kkgreen"
  }

  return (
    <a href={url} className=" block border-0 border-b-2 border-kkrose h-full"  >
    <Card className="border-0">
      
    
      <CardHeader>
        
        <div className="flex flex-row gap-6">
          <div className=" ">
            <div className="w-18 aspect-square flex justify-center align-center">
              <span className={`flex flex-col items-center rounded-2xl aspect-square justify-center `+ colorclass} >
                <span className="text-base uppercase tracking-widest uppercase  text-white font-serif ">{event.daytext}</span>
                <span className="text-2xl font-medium text-white font-serif">{event.datedm}</span>
              </span>
            </div>
          </div>
          <div className="">
            <span className="mb-4 block">
              <CardTitle className=" break-all hyphens-auto break-words min-h-20 md:min-h-44 font-sans font-bold text-2xl md:text-4xl line-clamp-5">{event.title_sl}</CardTitle>
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-row gap-6">
        <div className="basis-1/5 flex">
          <div className="w-20">
          <span className="flex flex-col items-center">
            <span className="text-2xl font-bold text-kkred font-serif ">{event.starting_at}</span>
          </span>
          </div>
        </div>
        <div className="basis-4/5">
          <span className="mb-4 block">
          <p className=" text-3xl uppercase text-kkred font-serif mb-2">{event.loc.name_sl}</p>
          <p className="text-2xl text-kkorange font-serif ">{event.loc.venuename_sl}</p>
          </span>
        </div>
        </div>
      </CardContent>        
    </Card>
  </a>
  )
}