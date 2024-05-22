
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

export default function Eventcardday({ className, ...props }: TcardProps) {
  let event = props.event;
  let colortheme = props.colortheme;
  
  let url = "/event/"+event.event_key;
  let colorclass = "green";

  if(colortheme == "orange"){
    colorclass = "bg-kkorange"
  }else{
    colorclass = "bg-kkgreen"
  }

  let imglsthumb = event.image_landscape_thumbnail;
  let imgls = event.image_portrait;

  let imgpthumb = event.image_portrait_thumbnail;
  let imgp = "";// I DONT KNOW IF WE HAVE ACTUALLY A image_portait field
  let imgthumb= "";

  if(imglsthumb=""){
    imgthumb=imglsthumb;
  }else{
    imgthumb=imgpthumb;
  }

  return (
    <a href={url} className="  mt-4 block "  >
    <Card className="border-0 bg-white  drop-shadow-xl ">
      
    
      <CardHeader>
        
        <div className="flex flex-row gap-6">
            <img className="max-h-56 ease-out duration-4000 transition-all hover:scale-103" src={imgthumb}  loading="lazy" alt={event.title_sl}/>
            <span className="flex items-end">
              <CardTitle className="  font-sans font-bold text-4xl line-clamp-5">{event.title_sl}</CardTitle>
            </span>
        
        </div>
      </CardHeader>
      <CardContent className="flex gap-4 justify-between items-center">
          <div className="w-18 aspect-square flex justify-center align-center">
            <span className={`flex flex-col items-center rounded-2xl aspect-square justify-center `+ colorclass} >
              <span className="text-base uppercase tracking-widest uppercase  text-white font-serif ">{event.daytext}</span>
              <span className="text-2xl font-medium text-white font-serif">{event.datedm}</span>
            </span>
          </div>
          <div className="flex gap-2 justify-between items-center w-full">
            <div className="flex flex-col">
              <span className="flex gap-4">
                <span className="text-3xl font-bold text-kkred font-serif ">{event.starting_at}</span>
                <p className=" text-3xl uppercase text-kkred font-serif inline-block">{event.loc.name_sl}</p>
              </span>
              <span><p className="text-2xl text-kkorange font-serif ">{event.loc.venuename_sl}</p></span>
            </div>
            
            
            
              
              <span className=" kkwide text-black font-light font-sans text-3xl right-0 flex items-center top-12">
                <span className="inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"/>
                    <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"/>
                  </svg>
                </span>
              </span>
            
          </div>
      </CardContent>        
    </Card>
  </a>
  )
}