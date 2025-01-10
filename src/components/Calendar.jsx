import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

const Calendar = ({ events, onAddEvent, onDeleteEvent }) => {
    const handleDateClick = (arg) => {
        const title = prompt("Ingrese el título del evento");
        const startTime = prompt("Ingrese la hora de inicio (formato: HH:mm)", "09:00");
        const endTime = prompt("Ingrese la hora de fin (formato: HH:mm)", "10:00");

        if (title && startTime && endTime) {
            const newEvent = {
                title,
                start: `${arg.dateStr}T${startTime}:00`,
                end: `${arg.dateStr}T${endTime}:00`,
                status: "active",
            };

            onAddEvent(newEvent);
        }
    };

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            locale="es"
            locales={[esLocale]}
            timeZone="local"
            editable={true}
            droppable={true}
            eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                meridiem: "short",
            }}
        />
    );
};

export default Calendar;
