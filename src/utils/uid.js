const buffer = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function uid(size = 7) {
    let id = "";
    let random = crypto.getRandomValues(new Uint8Array(size));

    for (let i = 0; i < size; i++) {
        id += buffer[random[i] % buffer.length];
    }
    return id;
}
