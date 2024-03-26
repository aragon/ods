import { testLogger } from '../../test';
import { clipboardUtils } from './clipboardUtils';

// Navigator.clipboard object is not defined on Jest by default
Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: jest.fn(), readText: jest.fn() },
});

describe('clipboard utils', () => {
    describe('copy', () => {
        const writeTextMock = jest.spyOn(navigator.clipboard, 'writeText');

        afterEach(() => {
            writeTextMock.mockReset();
        });

        it('copies the specified value on the user clipboard', async () => {
            const copyValue = 'copy-value';
            await clipboardUtils.copy(copyValue);
            expect(writeTextMock).toHaveBeenCalledWith(copyValue);
        });

        it('calls the onError callback on copy error', async () => {
            testLogger.suppressErrors();
            const onError = jest.fn();
            const error = new Error('test-error');
            writeTextMock.mockImplementation(() => {
                throw error;
            });
            await clipboardUtils.copy('test', { onError });
            expect(onError).toHaveBeenCalledWith(error);
        });
    });

    describe('paste', () => {
        const readTextMock = jest.spyOn(navigator.clipboard, 'readText');

        afterEach(() => {
            readTextMock.mockReset();
        });

        it('reads and returns the user clipboard', async () => {
            const clipboardValue = 'test-value';
            readTextMock.mockResolvedValue(clipboardValue);
            const result = await clipboardUtils.paste();
            expect(result).toEqual(clipboardValue);
        });

        it('calls the onError callback on paste error', async () => {
            testLogger.suppressErrors();
            const onError = jest.fn();
            const error = new Error('test-error');
            readTextMock.mockImplementation(() => {
                throw error;
            });
            const result = await clipboardUtils.paste({ onError });
            expect(result).toEqual('');
            expect(onError).toHaveBeenCalledWith(error);
        });
    });
});
