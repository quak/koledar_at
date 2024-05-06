
import React, { useState, useEffect, useRef } from 'react';
import useFetch from "react-fetch-hook";

 
import { Card, CardContent,CardHeader,CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
    

export default function Carouselreload(args) {
	
	
	const [page, setPage] = useState(0);
	const [items, setItems] = useState([]);

	let offset = 0;
	let from = "2024-04-20";
	let limit = 2;
	
	const { isLoading, data, error } = useFetch('https://www.koledar.at/v1/events?&offset='+offset+'&from='+from+'&limit='+limit);

	let datax = [];
	try {
		if(data!=undefined){
			datax = JSON.parse(data);
		}
        
    } catch (e) {
		datax = data;
    }	

	
	async function fetchDataLL() {
		setIsLoading(true);
		setError(null);

		const requestOptions = {
			method: 'POST',
			headers: {"Content-Type": "application/json"},
		  };    
		  
		  	try {
				let offset = 0;
				let from = "2024-04-20";
				let limit = 2;

				const response = await fetch('https://www.koledar.at/v1/events?&offset='+offset+'&from='+from+'&limit='+limit,requestOptions);
				
				const data = await response.json();
				
				setItems(prevItems => [...prevItems, ...data]);
				console.log(data);
				setPage(prevPage => prevPage + 1);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		
	}

	/** */

	const handleScroll = () => {
console.log("handlescroll");
		if (window.innerHeight + document.documentElement.scrollTop + document.getElementById("footer").offsetHeight > document.documentElement.offsetHeight || isLoading) {
		  return;
		}
		fetchDataLL();
	
	};
	
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isLoading]);

	/** */
	let llstyle = "lazy"
	console.log(datax);

	return (
		
		
		<>
			
				<Carousel className="w-full">
				<CarouselContent className="-ml-1">
				{datax?.items?.map(function (event,i) {
					console.log(event);
					return(
						<CarouselItem key={i} className="pl-1 md:basis-1/2 lg:basis-1/3">
							<a href="/prireditev/undefined" className="block  mt-4 block" key={i} >
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
											<p className="font-bold text-2xl uppercase  text-black">{event.title_sl}</p>
											<p className="text-xl  text-black">{event.title_sl}</p>
											</span>
										</div>
										</div>
									</CardContent>        
								</Card>
							</a>
						</CarouselItem>

					)}
					
					
					)}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
				</Carousel>	
				</>
	);
}
