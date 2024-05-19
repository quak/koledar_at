import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LocationResponse {
  items: Locations[];
  total_count: number;
  offset: number;
  limit: number;
}

interface Locations {  
  event_key: string;
  title_de: string;
  title_sl: string;
  venue: string;
  location: string;
}
 
export function Catselect() {
  const [locations, setLocations] = React.useState<Locations[]>([]);
  const getbase = async () =>{
    const resloc = await fetch(
      'https://admin.koledar.at/v1/categories?includeChildren=false&offset=0&limit=200',
    );
    const dataloc = (await resloc.json()) as LocationResponse;
    setLocations(dataloc.items) ;
    console.log(locations)

  };

  if (locations.length == 0) {
    getbase();
    
  }
 
  return (
    <Select className="bg-white">
      <SelectTrigger className="">
        <SelectValue placeholder="Kategorija" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup> 
        {locations.map(function (loc,i) {
					console.log(loc);
					return(
            <SelectItem value={loc.location_key}>{loc.name_sl}</SelectItem>
            
          )}
        )}
       
        </SelectGroup>
        
      </SelectContent>
    </Select>
  )
}