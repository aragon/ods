import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { InputFileAvatar, type IInputFileAvatarProps } from '.';

describe('<InputFileAvatar /> component', () => {
    const createTestComponent = (props?: Partial<IInputFileAvatarProps>) => {
        const completeProps = {
            id: 'input-file-avatar',
            ...props,
        };

        return <InputFileAvatar {...completeProps} />;
    };

    const originalGlobalImage = global.Image;
    const originalCreateObjectURL = URL.createObjectURL;
    const originalRevokeObjectURL = URL.revokeObjectURL;

    beforeAll(() => {
        (window.Image as unknown) = class MockImage {
            onload: () => void = () => {};
            src: string = '';
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

    it('renders without crashing', () => {
        render(createTestComponent());
    });

    it('should open file picker when avatar is clicked', () => {
        render(createTestComponent());
        const fileInput = screen.getByLabelText('Avatar Image Select');
        const mockClick = jest.fn();
        Object.defineProperty(fileInput, 'click', {
            value: mockClick,
        });
        const avatarButton = screen.getByRole('button');
        fireEvent.click(avatarButton);

        expect(mockClick).toHaveBeenCalled();
    });

    it('should display error message for invalid file type', async () => {
        render(createTestComponent());
        const fileInput = screen.getByLabelText('Avatar Image Select');
        const mockFile = new File(['(⌐□_□)'], 'chucknorris.svg', { type: 'image/svg+xml' });
        fireEvent.change(fileInput, { target: { files: [mockFile] } });

        await waitFor(() => {
            const errorMessage = screen.getByText('Invalid file type. Only JPEG and PNG are allowed.');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('should display error message for files too large', async () => {
        render(createTestComponent());
        const fileInput = screen.getByLabelText('Avatar Image Select');
        const largeMockFile = new File([new ArrayBuffer(3 * 1024 ** 2)], 'large_image.jpg', { type: 'image/jpeg' });
        fireEvent.change(fileInput, { target: { files: [largeMockFile] } });

        await waitFor(() => {
            const errorMessage = screen.getByText('File is too large. Max size is 2 MiB.');
            expect(errorMessage).toBeInTheDocument();
        });
    });

    it('transitions to success state w/ preview upon successful file selection', async () => {
        render(createTestComponent());
        const fileInput = screen.getByLabelText('Avatar Image Select');
        const mockFile = new File(['dummy content'], 'avatar.jpg', { type: 'image/jpeg' });
        fireEvent.change(fileInput, { target: { files: [mockFile] } });

        await waitFor(() => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        });

        const image = await screen.findByRole('img');
        expect(image).toHaveAttribute('src', 'mock-url');
        expect(image).toHaveAttribute('alt', 'avatar');
    });

    it('handles cancel action correctly after file selection', async () => {
        render(createTestComponent());
        const fileInput = screen.getByLabelText('Avatar Image Select');

        const mockFile = new File(['dummy content'], 'avatar.jpg', { type: 'image/jpeg' });
        fireEvent.change(fileInput, { target: { files: [mockFile] } });

        await waitFor(() => {
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        });

        const imagePreview = await screen.findByRole('img');
        expect(imagePreview).toBeInTheDocument();
        expect(imagePreview).toHaveAttribute('src', 'mock-url');
        expect(imagePreview).toHaveAttribute('alt', 'avatar');

        const cancelButton = screen.getByLabelText('Cancel Selection');
        fireEvent.click(cancelButton);

        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Cancel Selection')).not.toBeInTheDocument();
    });
});
