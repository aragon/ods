import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { useDropzone } from 'react-dropzone';
import { InputFileAvatar } from './inputFileAvatar';
import { type IInputFileAvatarProps } from './inputFileAvatar.api';

jest.mock('react-dropzone', () => ({
    useDropzone: jest.fn(),
    ErrorCode: {
        FileInvalidType: 'file-invalid-type',
        FileTooLarge: 'file-too-large',
        FileTooSmall: 'file-too-small',
        TooManyFiles: 'too-many-files',
    },
}));

describe('<InputFileAvatar /> Integration with react-dropzone', () => {
    const originalGlobalImage = global.Image;
    const originalCreateObjectURL = URL.createObjectURL;
    const originalRevokeObjectURL = URL.revokeObjectURL;

    beforeAll(() => {
        (window.Image as unknown) = class MockImage {
            onload: () => void = () => {};
            onerror: () => void = () => {};
            src: string = '';

            addEventListener = jest.fn((event, callback) => {
                if (event === 'load') {
                    this.onload = callback;
                } else if (event === 'error') {
                    this.onerror = callback;
                }
            });

            removeEventListener = jest.fn();

            constructor() {
                setTimeout(() => {
                    this.onload();
                }, 100);
            }
        };

        Object.defineProperty(URL, 'createObjectURL', {
            value: jest.fn(() => 'mock-url'),
            configurable: true,
        });
        Object.defineProperty(URL, 'revokeObjectURL', {
            value: jest.fn(),
            configurable: true,
        });
    });

    afterAll(() => {
        global.Image = originalGlobalImage;

        Object.defineProperty(URL, 'createObjectURL', {
            value: originalCreateObjectURL,
            configurable: true,
        });
        Object.defineProperty(URL, 'revokeObjectURL', {
            value: originalRevokeObjectURL,
            configurable: true,
        });
    });

    beforeEach(() => {
        (useDropzone as jest.Mock).mockClear();

        (useDropzone as jest.Mock).mockClear().mockImplementation(() => ({
            getRootProps: jest.fn(() => ({})),
            getInputProps: jest.fn(() => ({})),
            onDrop: jest.fn(),
        }));
    });

    const createTestComponent = (props?: Partial<IInputFileAvatarProps>) => {
        const completeProps = { ...props };

        return <InputFileAvatar {...completeProps} />;
    };

    it('renders without crashing', () => {
        render(createTestComponent());

        expect(screen.getByLabelText('Avatar Image Select')).toBeInTheDocument();
    });

    it('displays a preview when a valid file is selected', async () => {
        render(createTestComponent());

        const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
        const mockOnDrop = (useDropzone as jest.Mock).mock.calls[0][0].onDrop;
        mockOnDrop([file], []);

        await waitFor(() => {
            expect(screen.getByRole('img')).toHaveAttribute('src', 'mock-url');
        });
        expect(URL.createObjectURL).toHaveBeenCalledWith(file);
    });

    it('shows correct error when an unsupported file is too large', async () => {
        render(createTestComponent());

        const oversizedFile = new File([new ArrayBuffer(20 * 1024 * 1024)], 'big-image.png', { type: 'image/png' });
        const mockOnDrop = (useDropzone as jest.Mock).mock.calls[0][0].onDrop;
        mockOnDrop([], [{ file: oversizedFile, errors: [{ code: 'file-too-large', message: 'File is too large.' }] }]);

        await waitFor(() => {
            expect(screen.getByText(/Max file size is 2 MiB./i)).toBeInTheDocument();
        });
    });

    it('shows correct error when a file is wrong type', async () => {
        render(createTestComponent());

        const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/gif' });
        const mockOnDrop = (useDropzone as jest.Mock).mock.calls[0][0].onDrop;
        mockOnDrop([], [{ file, errors: [{ code: 'file-invalid-type', message: 'Invalid file type.' }] }]);

        await waitFor(() => {
            expect(screen.getByText(/Only JPEG and PNG images accepted./i)).toBeInTheDocument();
        });
    });
});
