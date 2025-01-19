export function formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    // Lấy các phần ngày, tháng, năm
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    // Trả về chuỗi đã định dạng
    return `Ngày ${day} tháng ${month} năm ${year}`;
}