export default function removeAccents(str: string) {
    return str
        .normalize("NFD") // Chuẩn hóa Unicode dạng NFD (Normalization Form Decomposition)
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các ký tự tổ hợp (dấu)
        .replace(/đ/g, "d") // Thay 'đ' thành 'd'
        .replace(/Đ/g, "D") // Thay 'Đ' thành 'D'
        .replace(/ /g, "-") 
}