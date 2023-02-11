import React, { useCallback, useState, useMemo, Fragment, useEffect } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useNavigate  } from "react-router-dom";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";


//components
import OptionsDD from '../components/OptionsDD';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const events = [
    {
      id: 1,
      start: moment().toDate(),
      end: moment().add(1, "hours").toDate(),
      title: "Some title",
    },
  ];
  
const views = {
  week: true
}
export default function CalendarComponent({
  currentUser
}){
    const [myEvents, setEvents] = useState(events);
    const [color, setColor ] = useState("#265985");
    const navigate = useNavigate();

    React.useEffect(()=>{
      console.log("currentUser: ", currentUser);
      if(!currentUser || !currentUser.length){
        navigate("/Boss_Scheduler/userselect");
      }
    },[currentUser])

    function handleColorChange(color){
      setColor(color.hex);
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
          console.log("existing: ", existing);
          console.log("filtered: ", filtered);


          return [...filtered, { ...existing, start, end }]
        })
      },
      [setEvents]
    )
    const handleSelectSlot = useCallback(
      (event) => {
        setEvents((prev) => {
          const idList = prev.map((item) => item.id)
          const newId = Math.max(...idList) + 1
          return [...prev, { ...event, id: newId }]
        })
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
              defaultDate={moment().toDate()}
              defaultView="week"
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