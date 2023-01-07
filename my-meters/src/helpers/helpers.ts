export function dateNow() {
    const date = new Date();
    return date.getFullYear() + '-' + 
        String(date.getMonth() + 1).padStart(2, '0') + '-' + 
        String(date.getDate()).padStart(2, '0');
}

export function dateTransform(date: string) {    
    return `${date.slice(8,10)}.${date.slice(5,7)}.${date.slice(0,4)}`
}

export function generateUUID() { 
    var d = new Date().getTime();
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;
    return 'xxxxxxxx-xxxxxxxx-xxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        // eslint-disable-next-line
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export function UUIDtoAuth (uuid: string): {email: string, password: string} {
    const arr = uuid.split('-')
    return {email: `${arr[0]}@${arr[1]}.ru`, password: `${arr[2]}`}
}

export function getCurrentHost() {
    // eslint-disable-next-line
    const [protocol, , host, ...rest] = window.location.href.split('/')
    return `${protocol}//${host}/`

}

export function getColorByMeterTitle(meterTitle: string): string {
    let meterColors = [
        ["Холодная", 'rgb(0, 0, 255)'],
        ["Горячая", 'rgb(255, 0, 0)'],
        ["Электричество день", 'rgb(64, 255, 0)'],
        ["Электричество ночь", 'rgb(0, 255, 64)'],
        ["Электричество", 'rgb(0, 255, 0)'],
        ["Газ", 'rgb(255, 255, 0)'],
      ];    

    for (let [meter, color] of meterColors) {        
        if (meterTitle.indexOf(meter) >= 0) return color
    }

    return 'rgb(0, 255, 255)'                    
}