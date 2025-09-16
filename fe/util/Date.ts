export default function DateFormat(s: string) {
    var d = new Date(parseInt(s) * 1000)

    return `${d.getDay()}-${d.getMonth() + 1}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`
}