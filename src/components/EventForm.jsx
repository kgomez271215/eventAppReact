import { useState, useRef, useEffect } from "react";
import {
    Box,
    Button,
    Input,
    Textarea,
    Stack,
    RadioGroup,
    Radio,
    FormLabel,
} from "@chakra-ui/react";

const EventForm = ({ event = null, onAddEvent, onEditEvent, onClose }) => {
    const [title, setTitle] = useState(event?.title || "");
    const [description, setDescription] = useState(event?.description || "");
    const [date, setDate] = useState(event ? event.start.split("T")[0] : "");
    const [time, setTime] = useState(event ? event.start.split("T")[1]?.slice(0, 5) : "");
    const [category, setCategory] = useState(event?.category || "Trabajo");
    const initialRef = useRef(null);

    useEffect(() => {
        if (initialRef.current) {
            initialRef.current.focus();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedEvent = {
            ...event,
            title,
            description,
            category,
            start: `${date}T${time}:00`,
            end: `${date}T${time}:59`,
            status: event?.status || "active",
        };

        if (event) {
            onEditEvent(updatedEvent);
        } else {
            onAddEvent(updatedEvent);
        }

        onClose();
    };

    return (
        <Box bg="white" p={5} borderRadius="md" boxShadow="md" maxWidth="400px" mx="auto">
            <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Input
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        ref={initialRef}
                    />
                    <Textarea
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        resize="none"
                    />
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <Input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <FormLabel>Categoría</FormLabel>
                    <RadioGroup
                        value={category}
                        onChange={(value) => setCategory(value)}
                    >
                        <Stack direction="column">
                            <Radio value="Trabajo">Trabajo</Radio>
                            <Radio value="Personal">Personal</Radio>
                            <Radio value="Reuniones">Reuniones</Radio>
                            <Radio value="Fiesta">Fiesta</Radio>
                            <Radio value="Capacitaciones">Capacitaciones</Radio>
                        </Stack>
                    </RadioGroup>
                    <Button type="submit" colorScheme="blue">
                        {event ? "Guardar Cambios" : "Guardar"}
                    </Button>
                    <Button onClick={onClose} colorScheme="gray">
                        Cancelar
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default EventForm;
