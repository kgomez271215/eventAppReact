import { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Text,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { RiCalendarEventLine } from "react-icons/ri";
import { TbTimelineEventPlus } from "react-icons/tb";
import Calendar from "../components/Calendar";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";

export const Home = () => {
    const [events, setEvents] = useState(() => {
        const storedEvents = localStorage.getItem("events");
        return storedEvents ? JSON.parse(storedEvents) : [];
    });
    const [eventToEdit, setEventToEdit] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (Notification.permission === "default") {
            Notification.requestPermission();
        }

        const timers = events
            .filter((event) => event.status === "active")
            .map((event) => {
                const eventTime = new Date(event.start).getTime();
                const currentTime = Date.now();
                const delay = eventTime - currentTime;

                if (delay > 0) {
                    return setTimeout(() => {
                        showNotification(event);
                    }, delay);
                }
                return null;
            });

        return () => timers.forEach((timer) => clearTimeout(timer));
    }, [events]);

    const showNotification = (event) => {
        if (Notification.permission === "granted") {
            new Notification("¡Es hora del evento!", {
                body: `${event.title}\n${event.description}`,
                icon: "https://cdn-icons-png.flaticon.com/512/1458/1458512.png",
            });
        }
    };

    const handleAddEvent = (event) => {
        const newEvent = { ...event, id: Date.now() };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        onClose();
    };

    const handleArchiveEvent = (eventToArchive) => {
        const updatedEvents = events.map((event) =>
            event === eventToArchive ? { ...event, status: "archived" } : event
        );
        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
    };

    const handleRestoreEvent = (eventToArchive) => {
        const updatedEvents = events.map((event) =>
            event === eventToArchive ? { ...event, status: "active" } : event
        );
        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
    };

    const handleDeleteEvent = (eventToDelete) => {
        let updatedEvents;

        if (eventToDelete.status === "deleted") {
            updatedEvents = events.filter((event) => event.id !== eventToDelete.id);
        } else {
            updatedEvents = events.map((event) =>
                event.id === eventToDelete.id ? { ...event, status: "deleted" } : event
            );
        }

        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
    };

    const handleEditEvent = (updatedEvent) => {
        const updatedEvents = events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
        );
        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
    };

    return (
        <Flex direction="column" align="center" justify="center" minHeight="100vh" minWidth="100vw" bg="#06162e">
            <Box display="flex" bg="#0e3061" width="100vw" height="100vh">
                <Box width="40%" padding={10} color={"white"}>
                    <Calendar
                        events={events.filter((event) => event.status === "active")}
                        onAddEvent={handleAddEvent}
                        onDeleteEvent={handleDeleteEvent}
                    />                </Box>
                <Box display="flex" alignItems="start" justifyContent="center" width="60%" padding={0} flexDirection={"column"}>
                    <Box display="flex" alignItems="center" justifyContent="center" width="100%" padding={5} color={"white"} fontSize={35} fontWeight={"bold"}>
                        <Text marginRight={5}>Eventos y Recordatorios</Text>
                        <RiCalendarEventLine />
                    </Box>
                    <Box display="flex" alignItems="start" justifyContent="center" width="100%" height={"100vh"} padding={10} color={"white"}>
                        <Tabs isFitted variant="enclosed" width="100%">
                            <TabList>
                                <Tab>Mis Eventos</Tab>
                                <Tab>Archivados</Tab>
                                <Tab>Eliminados</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Box display="flex" justifyContent="end" width="100%" padding={"0px"} flexDirection={"row"}>
                                        <Box display="flex" justifyContent="end" width="80%" padding={5}></Box>
                                        <Box display="flex" justifyContent="end" width="20%" padding={5}>
                                            <Button leftIcon={<TbTimelineEventPlus />} colorScheme="blue" onClick={onOpen}>
                                                Nuevo
                                            </Button>
                                        </Box>

                                    </Box>
                                    <EventList
                                        events={events.filter((event) => event.status === "active")}
                                        onArchive={handleArchiveEvent}
                                        onDelete={handleDeleteEvent}
                                        onRestore={handleRestoreEvent}
                                        onEdit={(event) => {
                                            setEventToEdit(event);
                                            onOpen();
                                        }}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <EventList
                                        events={events.filter((event) => event.status === "archived")}
                                        onArchive={handleArchiveEvent}
                                        onDelete={handleDeleteEvent}
                                        onRestore={handleRestoreEvent}
                                        onEdit={(event) => {
                                            setEventToEdit(event);
                                            onOpen();
                                        }}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <EventList
                                        events={events.filter((event) => event.status === "deleted")}
                                        onArchive={handleArchiveEvent}
                                        onDelete={handleDeleteEvent}
                                        onRestore={handleRestoreEvent}
                                        onEdit={(event) => {
                                            setEventToEdit(event);
                                            onOpen();
                                        }}
                                    />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Box>
            </Box>

            {/* Modal flotante */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Crear Nuevo Evento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <EventForm event={eventToEdit} onEditEvent={handleEditEvent} onAddEvent={handleAddEvent} onClose={() => {
                            setEventToEdit(null);
                            onClose();
                        }} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
};
