export const formatDate = (unixTimestamp?: number): string => {
    if (!unixTimestamp) {
        return '-';
    }

    const now = new Date();
    const date = new Date(unixTimestamp);
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
    const isCurrentYear = now.getFullYear() === date.getFullYear();
    const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const dateTimeOptions: Intl.DateTimeFormatOptions = isCurrentYear
        ? { month: 'long', day: 'numeric', ...timeOptions }
        : { year: 'numeric', month: 'long', day: 'numeric', ...timeOptions };

    if (diffDays < 1 && now.getDate() === date.getDate()) {
        return `Today at ${new Intl.DateTimeFormat('en-US', timeOptions).format(date)}`;
    } else if (diffDays < 2 && now.getDate() - date.getDate() === 1) {
        return `Yesterday at ${new Intl.DateTimeFormat('en-US', timeOptions).format(date)}`;
    } else if (diffDays < 7) {
        return `${diffDays} days ago at ${new Intl.DateTimeFormat('en-US', timeOptions).format(date)}`;
    } else {
        return new Intl.DateTimeFormat('en-US', dateTimeOptions).format(date);
    }
};
