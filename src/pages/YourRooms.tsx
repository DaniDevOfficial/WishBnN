import React from 'react'
import { Room } from '../types/Room'
import { YourOffers } from '../components/Creator/YourOffers'
import { getAuth } from 'firebase/auth';
import { Container } from '@chakra-ui/react';

export function YourRooms({ rooms }: { rooms: Room[] }) {
    const auth = getAuth();
    console.log(auth.currentUser?.uid);
    console.log(rooms)
    const RoomsOfCreator = rooms.filter(room => room.creatorID === auth.currentUser?.uid);
    console.log(auth.currentUser?.uid);
    return (
        <>
            <Container maxW="5xl" p={{ base: 4, sm: 10 }} >
                <YourOffers rooms={RoomsOfCreator} />
            </Container>
            </>
            )
}