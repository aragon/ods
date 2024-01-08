/* eslint-disable no-console */
class TestLogger {
    private shouldSuppressErrors = false;
    private originalConsoleError = console.error;

    setup = () => {
        beforeEach(() => {
            console.error = jest.fn((...params) => {
                if (!this.shouldSuppressErrors) {
                    this.originalConsoleError.apply(console, params);
                }
            });
        });

        afterEach(() => {
            this.shouldSuppressErrors = false;
            console.error = this.originalConsoleError;
        });
    };

    suppressErrors = () => {
        this.shouldSuppressErrors = true;
    };
}

export const testLogger = new TestLogger();
