import { QrCode } from "lucide-react";
import React, { useState, useEffect, useRef } from 'react';

export async function getEventforSlug(eventkey) {
  
    const response = await fetch("https://admin.koledar.at/v1/events/"+eventkey,
    {
      method: 'GET',
      headers: {
        
      }
    });
    let temp = await response.json();
    let kklocations  = (await getAllLocations()).items;
    let kkorganizers = (await getAllOrganizers()).items;

    let tt = new Array();
    tt.push(temp)

    var ed = enhanceData(tt,kklocations,kkorganizers);
    
    return ed["evsl"][0];
  }

async function getAllLocations() {
  
  const response = await fetch("https://admin.koledar.at/v1/locations?includeChildren=true",
  {
    method: 'GET',
    headers: {
      
    }
  });
  return await response.json();
}

async function getAllOrganizers() {
  const response = await fetch('https://admin.koledar.at/v1/organizers?offset=0&limit=200',
  {
    method: 'GET',
    headers: {
      
    }
  });
  return await response.json();
}

async function getEventsfromApi(limit) {
  const response = await fetch('https://admin.koledar.at/v1/events?limit='+limit+'&offset=0',
  {
    method: 'GET',
    headers: {
      
    }
  });
  return await response.json();
}

async function getEventsFromTo(from,to) {
    //https://koledar.at/v1/events?offset=0&from=2024-04-26&limit=20
    const response = await fetch('https://admin.koledar.at/v1/events?&offset=0&from='+from+'&to='+to+'&limit=30',
    {
        method: 'GET',
        headers: {
        
        }
    });
    return await response.json();
}

async function getEventsFromAndOffset(from,offset) {
    from = "2024-04-20";
    let limit=2;
    console.log('https://admin.koledar.at/v1/events?&offset='+offset+'&from='+from+'&limit='+limit);
    //https://koledar.at/v1/events?offset=0&from=2024-04-26&limit=20
    const response = await fetch('https://admin.koledar.at/v1/events?&offset='+offset+'&from='+from+'&limit='+limit,
    {
        method: 'GET',
        headers: {
        
        }
    });
    return await response.json();
}

export async function getAfterThisWeek() {



    var evsl = new Array;
    var evat = new Array;

    const currentDate = new Date(); 
    var day = currentDate.getDay();
    var firstnxtweekday = new Date(currentDate.getTime() + ( 24 * 60 * 60 * 1000)*(8-day)); //Hokuspokus fidibus 
    let dd = String(firstnxtweekday.getDate()).padStart(2, '0');
    let mm = String(firstnxtweekday.getMonth() + 1).padStart(2, '0'); 
    let yyyy = firstnxtweekday.getFullYear();
    var nxtweekstart = yyyy+"-"+mm+"-"+dd;

    let kkevents = (await getEventsFromAndOffset(nxtweekstart,0)).items;
    
    if(typeof kkevents != "undefined"){
        let kklocations  = (await getAllLocations()).items;
        let kkorganizers = (await getAllOrganizers()).items;
    
        const ed = enhanceData(kkevents,kklocations,kkorganizers);
    
        evsl = ed["evsl"];
        evat = ed["evat"];
    
        
    }


    let retevents = [];
    retevents["eventssl"] = evsl;
    retevents["eventsat"] = evat;

    return retevents;
}


export async function getUpcommingThisWeek() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy+"-"+mm+"-"+dd;

    const currentDate = new Date(); 
    var day = currentDate.getDay();
    var lastweekday = new Date(currentDate.getTime() + ( 24 * 60 * 60 * 1000)*(7-day)); //Hokuspokus fidibus
    dd = String(lastweekday.getDate()).padStart(2, '0');
    mm = String(lastweekday.getMonth() + 1).padStart(2, '0'); 
    yyyy = lastweekday.getFullYear();
    var weekend = yyyy+"-"+mm+"-"+dd;

    let kkevents = (await getEventsFromTo(today,weekend)).items;

    let kklocations  = (await getAllLocations()).items;
    let kkorganizers = (await getAllOrganizers()).items;

    const ed = enhanceData(kkevents,kklocations,kkorganizers);

    let evsl = ed["evsl"];
    let evat = ed["evat"];

    const chunkSize = 2;
    var chunksl = new Array;
    var chunkat = new Array;
    for (let i = 0; i < evsl.length; i += chunkSize) {
        chunksl.push(evsl.slice(i, i + chunkSize));
    }
    for (let j = 0; j < evat.length; j += chunkSize) {
        chunkat.push(evat.slice(j, j + chunkSize));
    }
    
    let eventssl = chunksl;
    let eventsat = chunkat;
    let retevents = [];
    retevents["eventssl"] = eventssl;
    retevents["eventsat"] = eventsat;
    
    return retevents;
}

export async function getEventsForToday() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy+"-"+mm+"-"+dd;

    let kkevents = (await getEventsFromTo(today,today)).items;

    let kklocations  = (await getAllLocations()).items;
    let kkorganizers = (await getAllOrganizers()).items;

    const ed = enhanceData(kkevents,kklocations,kkorganizers);
    
    let evsl = ed["evsl"];
    let evat = ed["evat"];

    let retevents = [];
    retevents["eventssl"] = evsl;
    retevents["eventsat"] = evat;

    return retevents;
}

export async function getEvents() {

  const date = new Date();


  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy+"-"+mm+"-"+dd;
  
  const currentDate = new Date(); 
  var day = currentDate.getDay();
  var lastweekday = new Date(currentDate.getTime() + ( 24 * 60 * 60 * 1000)*(7-day)); //Hokuspokus fidibus
  dd = String(lastweekday.getDate()).padStart(2, '0');
  mm = String(lastweekday.getMonth() + 1).padStart(2, '0'); 
  yyyy = lastweekday.getFullYear();
  var weekend = yyyy+"-"+mm+"-"+dd;

 
    
  
  let kklocations  = (await getAllLocations()).items;
  let kkorganizers = (await getAllOrganizers()).items;
  let kkevents     = (await getEventsfromApi(20)).items;

  const ed = enhanceData(kkevents,kklocations,kkorganizers);
  let evsl = ed["evsl"];
  let evat = ed["evat"];
               
  const chunkSize = 2;
  var chunksl = new Array;
  var chunkat = new Array;
  for (let i = 0; i < evsl.length; i += chunkSize) {
      chunksl.push(evsl.slice(i, i + chunkSize));
  }
  for (let j = 0; j < evat.length; j += chunkSize) {
      chunkat.push(evat.slice(j, j + chunkSize));
  }
 
  let eventssl = chunksl;
  let eventsat = chunkat;
  let retevents = [];
  retevents["eventssl"] = eventssl;
  retevents["eventsat"] = eventsat;
 
  return retevents;
}

function enhanceData(events,kklocations,kkorganizers){
    let kke = [];
          
    let evsl = new Array();
    let evat = new Array();    
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

    kke["evsl"] = evsl;
    kke["evat"] = evat;

    return kke;
}

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