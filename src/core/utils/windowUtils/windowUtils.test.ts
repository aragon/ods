import { windowUtils } from '.';

describe('WindowSizeUtils', () => {
    let addEventListenerSpy: jest.SpyInstance;
    let removeEventListenerSpy: jest.SpyInstance;
    let updateWindowSizeSpy: jest.SpyInstance;

    beforeEach(() => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
        Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 768 });

        windowUtils.stopListening();

        addEventListenerSpy = jest.spyOn(window, 'addEventListener');
        removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
        updateWindowSizeSpy = jest.spyOn(windowUtils, 'updateWindowSize');
    });

    afterEach(() => {
        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
        updateWindowSizeSpy.mockRestore();
    });

    test('should return correct initial window size', () => {
        const size = windowUtils.getWindowSize();
        expect(size).toEqual({ width: 1024, height: 768 });
    });

    test('should update window size on resize', () => {
        windowUtils.startListening();

        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
        Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 720 });
        window.dispatchEvent(new Event('resize'));

        expect(updateWindowSizeSpy).toHaveBeenCalledTimes(1);

        const size = windowUtils.getWindowSize();
        expect(size).toEqual({ width: 1280, height: 720 });

        windowUtils.stopListening();
    });

    test('should not update window size after stopListening is called', () => {
        windowUtils.startListening();

        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1280 });
        Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 720 });
        window.dispatchEvent(new Event('resize'));
        const adjustedSize = windowUtils.getWindowSize();
        expect(adjustedSize).toEqual({ width: 1280, height: 720 });

        windowUtils.stopListening();

        const sizeAfterStopListening = windowUtils.getWindowSize();
        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', windowUtils.updateWindowSize);
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1400 });
        Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1000 });
        window.dispatchEvent(new Event('resize'));

        expect(updateWindowSizeSpy).toHaveBeenCalledTimes(1);
        expect(sizeAfterStopListening).toEqual(adjustedSize);
    });
});
