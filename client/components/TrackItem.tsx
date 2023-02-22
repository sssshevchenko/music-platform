import React, { FC, useState } from 'react';
import { ITrack } from '../types/track';
import styles from '../styles/TrackItem.module.scss';
import { Card, Grid, IconButton } from '@mui/material';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { playTrack, setActive } from '../store/reducers/PlayerReducer';
import { useAppDispatch } from '../hooks/redux';
import axios from 'axios';
import { fetchAllTracks } from '../store/reducers/FetchTracks';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    
    const play = async (e: any) => {
        e.stopPropagation()
        dispatch(setActive(track))
        dispatch(playTrack())
        await axios.post('http://localhost:5000/tracks/listen/' + track._id)
    }

    const removeTrack = async (e: any) => {
        try {
            e.stopPropagation()
            await axios.delete('http://localhost:5000/tracks/' + track._id)
            await dispatch(fetchAllTracks())
        } catch(e: any) {
            console.log(e)
        }
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
                {active 
                    ? <Pause />
                    : <PlayArrow />
                }
            </IconButton>
            <img src={'http://localhost:5000/' + track.picture} width={70} height={70} style={{marginLeft: 10}}/>
            <Grid container direction='column' style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 13, color: 'gray'}}>{track.artist}</div>
            </Grid>
            <IconButton style={{marginLeft: 'auto'}} onClick={removeTrack}>
                <Delete />
            </IconButton>
        </Card>
    );
};

export default TrackItem;