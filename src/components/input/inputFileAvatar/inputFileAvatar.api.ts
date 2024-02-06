export const UploadState = {
    IDLE: 'idle',
    UPLOADING: 'uploading',
    SUCCESS: 'success',
    ERROR: 'error',
} as const;

export type UploadState = (typeof UploadState)[keyof typeof UploadState];
