import React, { useCallback, useState, useMemo, Fragment, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useNavigate  } from "react-router-dom";
import { Overlay, Tooltip, Button, Row, Col } from "react-bootstrap";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


//components
import OptionsDD from '../components/OptionsDD';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


  
const views = {
  week: true
}
export default function CalendarComponent({
  currentUser
}){
    const events = [
      {
        id: 1,
        start: moment().toDate(),
        end: moment().add(1, "hours").toDate(),
        title: currentUser,
        user: currentUser
      },
    ];
    console.log("localStorage events: ", JSON.parse(localStorage.getItem("events")));
    const [myEvents, setEvents] = useState(events);
    const [color, setColor ] = useState("#265985");
    const navigate = useNavigate();


    React.useEffect(()=>{
      console.log("myEvents: ", myEvents);
      localStorage.setItem("events", JSON.stringify(myEvents));
    },[myEvents])


    React.useEffect(()=>{
      if(!currentUser || !currentUser.length){
        navigate("/Boss_Scheduler/userselect");
      }
    },[currentUser])

    function handleColorChange(color){
      setColor(color.hex);
      localStorage.setItem("color", color.hex);
    }
    const handleEventDrop = useCallback(
      ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
        const { allDay } = event
        if (!allDay && droppedOnAllDaySlot) {
          event.allDay = true
        }
  
        setEvents((prev) => {
          const existing = prev.find((ev) => ev.id === event.id) ?? {}
          const filtered = prev.filter((ev) => ev.id !== event.id)
          return [...filtered, { ...existing, start, end, allDay }]
        })
      },
      [setEvents]
    )
    const onEventResize = useCallback(
      ({ event, start, end }) => {
        setEvents((prev) => {
          const existing = prev.find((ev) => ev.id === event.id) ?? {}

          const filtered = prev.filter((ev) => ev.id !== event.id)

          return [...filtered, { ...existing, start, end }]
        })
      },
      [setEvents]
    )
    const handleSelectSlot = useCallback(
      (event) => {
        //if user selects somewhere in the calendar (not top area) or clicks and drags
        if(event.box ||event.bounds){
          setEvents((prev) => {
            const idList = prev.map((item) => item.id)
            const newId = Math.max(...idList) + 1
            return [...prev, { 
              ...event, 
              id: newId, 
              user: currentUser,
              title: currentUser
            }]
          })
        }

      },
      [setEvents]
    )
    const handleSelectEvent = useCallback(
      (event) => console.log("clicked event: ", event),
      []
    )

    const eventPropGetter = useCallback(
      (event, start, end, isSelected) => ({
        style: {backgroundColor: color}
      }),
      [color]
    )
    const removeEvent = useCallback(
      (event) => {
        const remove_confirm = window.confirm("Would you like to remove this event?");
        if(remove_confirm === true){
          console.log("you removed: ", event);
          setEvents((prev) => {
            const events = [...prev];
            const index = events.indexOf(event.event);
            events.splice(index,1);
            return {events};
          })

          console.log("after removing: ", myEvents);
        }
      },
      []
    )

    // function removeEvent(event){
    //   const remove_confirm = window.confirm("Would you like to remove this event?")
    //   if(remove_confirm === true){
    //     console.log("you removed: ", event);
    //     this.setState((prevState, props) => {
    //       const events = [...prevState.events]
    //       const idx = events.indexOf(pEvent)
    //       events.splice(idx, 1);
    //       return { events };
    //     });
    //   }
    // }

    // onSelectEvent(pEvent) {
    //   const r = window.confirm("Would you like to remove this event?")
    //   if(r === true){
        
    //     this.setState((prevState, props) => {
    //       const events = [...prevState.events]
    //       const idx = events.indexOf(pEvent)
    //       events.splice(idx, 1);
    //       return { events };
    //     });
    //   }
    // }

    const TooltipContent = ({onClose, event}) => {
      console.log("event: ", event);
      console.log("start date: ", moment(event.event.start).format("h:mma"));
      const start_time = moment(event.event.start).format("h:mma");
      const end_time = moment(event.event.end).format("h:mma")
      return (
        <div className="tooltip-container bg-slate-50 p-2 rounded-md">
          <div className="flex justify-between">
            <div>{event.title}</div>
            <div
              className="cursor-pointer font-light text-xs p-px rounded-md text-red-500 border border-gray-300 w-max"
              onClick={()=>removeEvent(event)}
            >DELETE</div>
          </div>
          <div>{start_time} - {end_time}</div>
            
        </div>
      );
    }
    function EventComponent(event) {
      const [showTooltip, setShowTooltip] = useState(false);
    
      const closeTooltip = () => {
        setShowTooltip(false);
      };
    
      const openTooltip = () => {
        setShowTooltip(true);
      }
      const ref = useRef(null);
    
      const getTarget = () => {
        return ReactDOM.findDOMNode(ref.current);
      };
    
      return (
        <div 
          className="event-container h-full" 
          // onMouseLeave={closeTooltip}
          ref={ref}
          onMouseOver={openTooltip}
        >
          <span  className="font-light text-sm">{event.title}</span>
          <Overlay
            rootClose
            target={getTarget}
            show={showTooltip}
            placement="top"
            onHide={closeTooltip}
            className="overlay-container"
          >
            <Tooltip 
              id="event-tooltip"
              // onMouseLeave={closeTooltip}
            >
              <TooltipContent event={event} onClose={closeTooltip}/>
            </Tooltip>
          </Overlay>
        </div>
      );
    }
    return(
        <div className="wrapper">
            <div className="flex justify-between items-center p-2">
                <div className="flex">
                    <div>{`Welcome`}</div> <div className="ml-1 font-bold"> {currentUser}</div>
                </div>

                <OptionsDD
                  color={color}
                  handleColorChange={handleColorChange}
                />
            </div>
            <DnDCalendar
              tooltipAccessor={null}
              components={{ event: EventComponent }}
              defaultDate={moment().toDate()}
              defaultView="week"
              scrollToTime={moment().toDate()}
              events={myEvents}
              localizer={localizer}
              onEventDrop={handleEventDrop}
              onEventResize={onEventResize}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              eventPropGetter={eventPropGetter}
              views={views}
              toolbar = {false}
              resizable
              selectable
              style={{ height: "80vh" }}
            />
        </div>

    )
}


//TODO
//have to change it so instead of sunday - monday with the dates, it's wednesday to monday without any dates