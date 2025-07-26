
const debounce = (fun: (...args: any[]) => void, time: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => fun(...args), time);
    };
};


export default debounce;