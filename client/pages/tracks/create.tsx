import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import FileUpload from '../../components/FileUpload';
import StepWrapper from '../../components/StepWrapper';
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layouts/MainLayout';
import Blob from 'cross-blob';

const Create = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState('')
    const [audio, setAudio] = useState('')
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()

    // const blobPicture = new Blob([picture as Blob], {type: 'image/*'})
    // const blobAudio = new Blob([audio as Blob], {type: 'audio/*'})


    const back = () => {
        setActiveStep(prev => prev -1)
    }

    const nextStep = async () => {
        if(activeStep !==2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('artist', artist.value)
            formData.append('lyrics', text.value)
            formData.append('audio', audio[0])
            formData.append('picture', picture[0])
            await axios.post('http://localhost:5000/tracks', formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e)) 
        }
    }

    console.log(audio)
    console.log(picture)

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                <Grid container direction='column' style={{padding: 20}}>
                    <TextField 
                        {...name}
                        label='Track title'
                        style={{marginTop: 10}}
                    />
                    <TextField 
                        {...artist}
                        label='Artist name'
                        style={{marginTop: 10}}
                    />
                    <TextField 
                        {...text}
                        label='Lyrics'
                        style={{marginTop: 10}}
                    />
                </Grid>
                }
                {activeStep === 1 && 
                    <FileUpload setFile={setPicture} accept='image/*'>
                        <Button>Load Picture</Button>
                    </FileUpload>
                }
                {activeStep === 2 && 
                    <FileUpload setFile={setAudio} accept='audio/*'>
                        <Button>Load Audio</Button>
                    </FileUpload>
                }
            </StepWrapper>
            <Grid container justifyContent='space-between'>
                <Button disabled={activeStep === 0} onClick={back}>Back</Button>
                <Button onClick={nextStep}>Next Step</Button>
            </Grid>
        </MainLayout>
    );
};

export default Create;