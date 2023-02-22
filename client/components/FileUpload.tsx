import React, { FC, ReactNode, useRef } from 'react';

interface FileUploadProps {
    setFile: Function;
    children?: ReactNode;
    accept: string;
}

const FileUpload: FC<FileUploadProps> = ({setFile, children, accept}) => {
    const ref = useRef<HTMLInputElement>(null)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files)
    }

    return (
        <div onClick={() => ref.current?.click()}>
            <input
                type="file" 
                accept={accept}
                style={{display: 'none'}}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;