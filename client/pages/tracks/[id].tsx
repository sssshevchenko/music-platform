import { Button, Card, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layouts/MainLayout';
import { wrapper } from '../../store/store';
import { ITrack } from '../../types/track';

interface TrackPageProps {
    serverTrack: ITrack
}

const TrackPage: FC<TrackPageProps> = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                track: track._id
            })
            setTrack({...track, comments: [...track.comments, response.data]})
        } catch(e: any) {
            console.log(e)
        }
    }

    return (
        <MainLayout title={track.name}>
            <Button
                variant='outlined'
                style={{fontSize: 17}} 
                onClick={() => router.push('/tracks')} 
            >
                Back to List
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={'http://localhost:5000/' + track.picture} width={200} height={200} />
                <div style={{marginLeft: 30}}>
                    <h1>Track name - {track.name}</h1>
                    <h1>Artist - {track.artist}</h1>
                    <h1>Listens - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Lyrics</h1>
            <p>{track.text}</p>
            <h1>Comments</h1>
            <Grid container>
                <TextField
                    label='Your name'
                    fullWidth
                    style={{marginBottom: 10}}
                    {...username}
                />
                <TextField 
                    label='Comment'
                    fullWidth
                    multiline
                    rows={4}
                    {...text}
                />
                <Button 
                    variant='outlined' 
                    style={{margin: '10px 0'}} 
                    onClick={addComment}
                >
                    Send
                </Button>
            </Grid>
            <div>
                {track.comments.map(comment => 
                    <Card key={comment._id} style={{margin: '10px 0', padding: '10px'}}>
                        <div style={{marginBottom: 10}}>Author - {comment.username}</div>    
                        <div>Comment - {comment.text}</div>    
                    </Card>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const id = context.params?.id
        const response = await axios.get('http://localhost:5000/tracks/' + id)

        return {
            props: {
                serverTrack: response.data
            }
        }
    } 
)