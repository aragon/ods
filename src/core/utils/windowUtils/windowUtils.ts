class WindowSizeUtils {
    private width: number = window.innerWidth;
    private height: number = window.innerHeight;

    public updateWindowSize = () => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    };

    public getWindowSize() {
        return {
            width: this.width,
            height: this.height,
        };
    }

    public startListening() {
        window.addEventListener('resize', this.updateWindowSize);
    }

    public stopListening() {
        window.removeEventListener('resize', this.updateWindowSize);
    }
}

export const windowUtils = new WindowSizeUtils();
