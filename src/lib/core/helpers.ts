export const redirectBasedOnDriver = (url: string) => {
    if (
        navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent) // regex from https://stackoverflow.com/a/23522755
    ) {
        location.href = url;
    }
};
