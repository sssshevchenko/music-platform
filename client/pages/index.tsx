import React from 'react';
import MainLayout from '../layouts/MainLayout';

const Index = () => {
    return (
        <>
            <MainLayout>
                <div className='center'>
                    <h1>You're welcome!</h1>
                    <h3>Here You can listen the best tracks!</h3>
                </div>
            </MainLayout>

            <style jsx>
                {`
                    .center {
                        margin-top: 150px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                `}
            </style>
        </>
    );
};

export default Index;