import { Box, Button, Card, Grid, TextField } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import TrackList from '../../components/TrackList';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import MainLayout from '../../layouts/MainLayout';
import { fetchAllTracks, searchTrack } from '../../store/reducers/FetchTracks';
import { wrapper } from '../../store/store';

const Index = () => {
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [timer, setTimer] = useState<any>()

    const {tracks, isLoading, error} = useAppSelector(state => state.tracks)
    const dispatch = useAppDispatch()

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if(timer) {
            clearTimeout(timer)
        }
        setTimer(setTimeout(async () => {
            await dispatch(searchTrack(e.target.value))
        }, 500))
    }

    return (
        <MainLayout title='Tracks'>
            <Grid container justifyContent='center'>
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Track List</h1>
                            <Button onClick={() => router.push('/tracks/create')}>
                                Load Track
                            </Button>
                        </Grid>
                    </Box>
                    <TextField 
                        fullWidth
                        value={query}
                        onChange={search}
                        label='Search track'
                    />
                    {isLoading && <h1>Loading...</h1>}
                    {error && <h1>{error}</h1>}
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout> 
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        await store.dispatch(fetchAllTracks())
        return {
            props: {}
        }
    }
) 