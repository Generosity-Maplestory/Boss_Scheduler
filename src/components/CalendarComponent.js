import React, { useCallback, useState, useMemo, Fragment, useEffect } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

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
export default function CalendarComponent(){
    const [myEvents, setEvents] = useState(events)

    useEffect(()=>{
      console.log("myevents: ", myEvents);
      
    },[myEvents])
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
    return(
        <div className="wrapper">
            <DnDCalendar
              defaultDate={moment().toDate()}
              defaultView="week"
              events={myEvents}
              localizer={localizer}
              onEventDrop={handleEventDrop}
              onEventResize={onEventResize}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              views={views}
              toolbar = {false}
              resizable
              selectable
              style={{ height: "90vh" }}
            />
        </div>

    )
}