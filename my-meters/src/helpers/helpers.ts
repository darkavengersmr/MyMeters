export function dateNow() {
    const date = new Date();
    return date.getFullYear() + '-' + 
        String(date.getMonth() + 1).padStart(2, '0') + '-' + 
        String(date.getDate()).padStart(2, '0');
}

export function dateTransform(date: string) {    
    return `${date.slice(8,10)}.${date.slice(5,7)}.${date.slice(0,4)}`
}