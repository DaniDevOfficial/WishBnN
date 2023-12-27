import React from 'react';
import { Box, Flex, Icon, Text, Button, Stack, useColorModeValue, HStack, UnorderedList, Heading, ListItem } from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './RoomDetailsComponent.css';
export function DescriptionAndRent({ content }) {
    const mapContainerStyle = {
        width: '100%',
        height: '300px',
    };

    const center = {
        lat: 47.459268,
        lng: 8.751775,
    };

    return (
        <Box mt={4}>
            <Flex align="center" mb={2}>
                <Icon as={FaUserCircle} boxSize={6} color="gray.500" mr={2} />
                <Text fontWeight="bold">{content.creator}</Text>
            </Flex>
            <Heading as="h2" size="lg" mb={2}>
                {content.title}
            </Heading>
            <Text color={useColorModeValue("text.base", "text.darkmode")} fontSize="md" mb={4}>
                {content.longDescription}
            </Text>
            <Flex align="center" mb={4}>
                <Text fontSize="lg" fontWeight="bold" color={useColorModeValue("accent.base", "accent.darkmode")}>
                    {content.price} CHF
                </Text>
                <Text color="gray.500" ml={2}>
                    Per Night
                </Text>
            </Flex>
            <Box mt={4}>
                <Heading as="h3" size="md">
                    Additional Features:
                </Heading>
                <UnorderedList>
                    {Object.keys(content.additionalFeatures).map((featureName) => {
                        const feature = content.additionalFeatures[featureName];
                        console.log(feature);
                        return (
                            <ListItem key={featureName}>
                                {feature.name}: {feature.pricePerNight} CHF per night
                            </ListItem>
                        );
                    })}
                </UnorderedList>
            </Box>
            <Heading my={4}>
                You Would Stay Here:
            </Heading>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_API_KEY}>
                <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={14}>
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
            {content.unavailableDates.length > 0 && (
                <Box mt={4}>
                    <Heading as="h3" size="md">
                        Available Dates:
                    </Heading>
                    <Calendar
                        tileDisabled={({ date }) =>
                            content.unavailableDates.some(
                                (dateRange) =>
                                    new Date(date) >= new Date(dateRange.startDate) &&
                                    new Date(date) <= new Date(dateRange.endDate)
                            )
                        }
                    />
                </Box>
            )}
            <Button my={10} bgColor={useColorModeValue("primary.base", "primary.darkmode")} color={useColorModeValue("white", "black")} size="md" mb={4}>
                Book Now
            </Button>

            <Text fontSize="lg" fontWeight="bold" mb={2}>
                Other Locations
            </Text>
            <Stack spacing={2}>
                <Text>Location 1</Text>
                <Text>Location 2</Text>
                <Text>Location 3</Text>
            </Stack>

        </Box>
    );
}