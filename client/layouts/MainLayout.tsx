import { Container } from '@mui/system';
import Head from 'next/head';
import React, { FC, ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Player from '../components/Player';

interface BaseLauoutProps {
    children?: ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: FC<BaseLauoutProps> = ({children, title, description, keywords}) => {
    return (
        <>
            <Head>
                <title>{title || 'Music Platform'}</title>
                <meta name='description' content={'Music platform where you can upload your tracks and share it with the world. ' + description} />
                <meta name='robots' content='follow, index' />
                <meta name='keywords' content={keywords || 'Music, tracks, artists'} />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
            </Head>
            <Navbar />
            <Container>
                {children}
            </Container>
            <Player />
        </>
    );
};

export default MainLayout;