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
    Badge,
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
    const [selectedFilter, setSelectedFilter] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();


    const categoryColors = {
        Trabajo: "blue",
        Personal: "green",
        Reuniones: "yellow",
        Fiesta: "purple",
        Capacitaciones: "red",
    };

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

    const renderFilteredEvents = (status) => {
        const filtered = events.filter(
            (event) => event.status === status && (!selectedFilter || event.category === selectedFilter)
        );

        if (filtered.length === 0) {
            return <Text>No hay eventos disponibles.</Text>;
        }

        return (
            <EventList
                events={filtered}
                onArchive={handleArchiveEvent}
                onDelete={handleDeleteEvent}
                onRestore={handleRestoreEvent}
                onEdit={(event) => {
                    setEventToEdit(event);
                    onOpen();
                }}
            />
        );
    };

    return (
        <Flex direction="column" align="center" justify="center" minHeight="100vh" minWidth="100vw" bg="#06162e">
            <Box display="flex" bg="#0e3061" width="100vw" height="100vh">
                <Box width="40%" padding={10} color={"white"}>
                    <Calendar
                        events={events.filter((event) => event.status === "active")}
                        onAddEvent={handleAddEvent}
                        onDeleteEvent={handleDeleteEvent}
                    />
                </Box>
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
                                {["active", "archived", "deleted"].map((status, index) => (
                                    <TabPanel key={index}>
                                        <Box display="flex" justifyContent="space-between" marginBottom={4}>
                                            <Box>
                                                <Badge
                                                    colorScheme={!selectedFilter ? "gray" : "teal"}
                                                    cursor="pointer"
                                                    padding="2px 10px 2px 10px"
                                                    borderRadius={15}
                                                    marginRight={2}
                                                    onClick={() => setSelectedFilter(null)}
                                                    variant={!selectedFilter ? "solid" : "outline"}
                                                >
                                                    Todos
                                                </Badge>
                                                {Object.entries(categoryColors).map(([category, color]) => (
                                                    <Badge
                                                        key={category}
                                                        colorScheme={color}
                                                        cursor="pointer"
                                                        marginRight={2}
                                                        padding="2px 10px 2px 10px"
                                                        borderRadius={15}
                                                        onClick={() => setSelectedFilter(selectedFilter === category ? null : category)}
                                                        variant={selectedFilter === category ? "solid" : "outline"}
                                                    >
                                                        {category}
                                                    </Badge>
                                                ))}
                                            </Box>
                                            {status === "active" && (
                                                <Button leftIcon={<TbTimelineEventPlus />} colorScheme="blue" onClick={() => {
                                                    setEventToEdit(null)
                                                    onOpen()
                                                }} >
                                                    Nuevo
                                                </Button>
                                            )}
                                        </Box>
                                        {renderFilteredEvents(status)}
                                    </TabPanel>
                                ))}
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
                        <EventForm
                            event={eventToEdit}
                            onEditEvent={handleEditEvent}
                            onAddEvent={handleAddEvent}
                            onClose={() => {
                                setEventToEdit(null);
                                onClose();
                            }}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
};
