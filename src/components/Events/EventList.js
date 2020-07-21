import React, { useState, useEffect } from "react";
import APIManager from "../Modules/APIManager";
import EventCard from "../Events/EventCard";
import EventForm from "../Events/EventForm";
import "./Event.css";


const EventList = (props) => {
  // The initial state is an empty array
  const [places, setEvents] = useState([]);
  const [place, setEvent] = useState({
  userId: 0,
  name: "",
  date: "",
  place: "",
});
  const getEvent = () => {
    // After the data comes back from the API, we
    //  use the setEvents function to update state
    return APIManager.GetAll("events").then((eventsFromAPI) => {
      setEvents(eventsFromAPI);
    });
  };
  const deleteEvent = (id) => {
    APIManager.delete(id).then(() =>
      APIManager.GetAll("events").then(setEvents)
    );

  };

  const editEvent = (id) => {
    APIManager.edit(id).then(() =>
      APIManager.GetAll("events").then(setEvents)
    );
  };
  const constructNewEvent = place => {
   
    if (place !== "") {
      APIManager.Push("events", place).then(() =>
        APIManager.GetAll("events").then(setEvents)
      );
        
    } else {
      window.alert("Please enter an Event");
    }
  }

  // got the events from the API on the component's first render
  useEffect(() => {
    getEvent();
  }, []);

  // Finally we use map() to "loop over" the events array to show a list of animal cards
  return (
    <div className="container-eventCards">
      {/* //add this button above your display of events cards */}
      <section className="section-eventContent">
        
        <EventForm placeConstruct={constructNewEvent} />
      </section>
      {places.map((place) => (
        <EventCard
          key={place.id}
          locations={place}
          deleteEvent={deleteEvent}
          editEvent={editEvent}
          {...props}
        />

        
      ))}
    </div>
  );
};
export default EventList;
