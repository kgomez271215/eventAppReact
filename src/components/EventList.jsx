import { Box, Text, Button, Badge } from "@chakra-ui/react";

const EventList = ({ events, onArchive, onDelete, onRestore, onEdit }) => {

    if (events.length === 0) {
        return (
            <Text color="white" textAlign="center">
                No hay eventos en esta categoría.
            </Text>
        );
    }
    const categoryColors = {
        Trabajo: "blue",
        Personal: "green",
        Reuniones: "yellow",
        Fiesta: "purple",
        Capacitaciones: "red",
    };
    return (
        <Box
            maxHeight="61vh"
            overflowY="auto"
            padding={"0px 10px 0px 0px"}
            sx={{
                // Estilo del scroll
                "&::-webkit-scrollbar": {
                    width: "8px", // ancho de la barra
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "blue.500", // color de la barra
                    borderRadius: "4px", // redondear borde de la barra
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    background: "blue.600", // color de la barra al pasar el cursor
                },
                "&::-webkit-scrollbar-track": {
                    background: "gray.300", // color de fondo del desplazador de la barra
                    borderRadius: "4px",
                },
            }}
        >
            {events.map((event, index) => (
                <Box key={index} p={4} bg="gray.500" borderRadius="md" mb={4} boxShadow="sm" display="flex">
                    <Box display="flex" width="60%" flexDirection="column">
                        <Box display="flex" alignItems="center" justifyContent="start">
                            <Text fontSize="26px" fontWeight="bold">{event.title}</Text>
                            <Badge marginTop={2} marginLeft={5} borderRadius={10} fontSize="12px" padding={"0 10px 0 10px"} colorScheme={categoryColors[event.category] || "gray"}>
                                {event.category || "Sin Categoría"}
                            </Badge>
                        </Box>
                        <Text fontSize="16px" fontWeight="bold">{event.description}</Text>
                        <Text>Inicia: {event.start}</Text>
                        <Text>Finaliza: {event.end}</Text>
                    </Box>
                    <Box display="flex" width="40%" flexDirection="column" justifyContent="center" alignItems="end">
                        {(event.status === "active" || event.status === "archived") && <Button
                            colorScheme="blue"
                            size="sm"
                            minWidth="40%"
                            maxWidth="50%"
                            marginBottom={5}
                            onClick={() => onEdit(event)}
                        >
                            Editar
                        </Button>}
                        {event.status === "active" && (
                            <Button
                                colorScheme="yellow"
                                size="sm"
                                minWidth="40%"
                                maxWidth="50%"
                                marginBottom={5}
                                onClick={() => onArchive(event)}
                            >
                                Archivar
                            </Button>
                        )}
                        {(event.status === "archived" || event.status === "deleted") && (
                            <Button
                                colorScheme="green"
                                size="sm"
                                minWidth="40%"
                                maxWidth="50%"
                                marginBottom={5}
                                onClick={() => onRestore(event)}
                            >
                                Restaurar
                            </Button>
                        )}
                        <Button
                            colorScheme="red"
                            size="sm"
                            minWidth="40%"
                            maxWidth="50%"
                            onClick={() => onDelete(event)}
                        >
                            Eliminar
                        </Button>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default EventList;
