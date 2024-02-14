import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useDropzone } from 'react-dropzone';
import { InputFileAvatar } from './inputFileAvatar';
import { type IInputFileAvatarProps } from './inputFileAvatar.api';

jest.mock('react-dropzone', () => ({
    ...jest.requireActual('react-dropzone'),
    useDropzone: jest.fn().mockImplementation(() => {
        return {
            getRootProps: jest.fn(() => ({})),
            getInputProps: jest.fn(() => ({})),
        };
    }),
}));

describe('<InputFileAvatar /> component', () => {
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
            value: jest.fn(() => 'http://mock-url'),
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
    });

    afterEach(() => {
        jest.restoreAllMocks(); // Restores all mocks to their original value
    });

    const createTestComponent = (props?: Partial<IInputFileAvatarProps>) => {
        const completeProps = { ...props };

        return <InputFileAvatar {...completeProps} />;
    };

    it('renders without crashing', () => {
        render(createTestComponent());
    });

    it('displays a preview when a valid file is selected', async () => {
        render(createTestComponent());

        const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
        const mockOnDrop = (useDropzone as jest.Mock).mock.calls[0][0].onDrop;
        act(() => {
            mockOnDrop([file], []);
        });
        await waitFor(() => {
            expect(screen.getByRole('img')).toHaveAttribute('src', 'http://mock-url');
        });
        expect(URL.createObjectURL).toHaveBeenCalledWith(file);
    });

    it('calls onFileError with specific error code for incorrect dimensions', async () => {
        const mockOnFileError = jest.fn();
        render(createTestComponent({ onFileError: mockOnFileError, maxDimension: 1000, minDimension: 1000 }));

        const originalWidth = global.Image.prototype.width;
        const originalHeight = global.Image.prototype.height;

        global.Image.prototype.width = 1200;
        global.Image.prototype.height = 1200;

        const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });

        const mockOnDrop = (useDropzone as jest.Mock).mock.calls[0][0].onDrop;
        await act(async () => {
            mockOnDrop(file, [], []);
        });
        await waitFor(() => {
            expect(mockOnFileError).toHaveBeenCalledWith('wrong-dimension');
        });

        global.Image.prototype.width = originalWidth;
        global.Image.prototype.height = originalHeight;
    });

    it('properly cancels the file selection and returns to the initial state', async () => {
        render(createTestComponent());
        const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
        const mockOnDrop = (useDropzone as jest.Mock).mock.calls[0][0].onDrop;

        await act(async () => {
            mockOnDrop([file], []);
        });

        await waitFor(() => {
            expect(screen.getByTestId('avatar')).toHaveAttribute('src', expect.stringContaining('mock-url'));
        });

        await waitFor(() => {
            expect(screen.getByLabelText('Cancel Selection')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByLabelText('Cancel Selection'));

        await waitFor(() => {
            expect(screen.queryByTestId('avatar')).not.toBeInTheDocument();
        });
    });
});
