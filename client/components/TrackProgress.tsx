import React, { FC } from 'react';

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TrackProgress: FC<TrackProgressProps> = ({left, right, onChange}) => {
    return (
        <div style={{display: 'flex', marginRight: 20}}>
            <input
                min={0}
                max={right}
                value={left}
                onChange={onChange} 
                type="range" 
            />
            <div>{left} / {right}</div>
        </div>
    );
};

export default TrackProgress;