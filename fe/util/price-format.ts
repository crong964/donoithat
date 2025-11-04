export default function priceFormat(params: string) {
    params = params + ""
    let f = params.replaceAll(",", "")
    let temp = ""
    let count = 0
    for (let index = f.length - 1; index > 0; index--) {
        const element = f[index];
        temp += element
        count += 1
        if (count % 3 == 0) {
            temp += ","
            count = 0
        }
    }
    if (f[0] != undefined) {
        temp += f[0]
    }
    return temp.split("").reverse().join("")
}