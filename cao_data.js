import fs from "fs";

var tl = [{ "id": "plyhome", "name": "NỘI THẤT GỖ PLYHOME", 
    "con": [{ "id": "ban-an-ghe-an", "name": "Bàn ăn - Ghế ăn" }, { "id": "ghe-don-ghe-thu-gian", "name": "Ghế đôn - Ghế thư giãn" }, { "id": "ke-sach", "name": "Kệ sách - Kệ trang trí" }, { "id": "tu-quan-ao", "name": "Tủ giá treo quần áo" }, { "id": "tu-ke-giay", "name": "Tủ kệ giày" }] }, { "id": "mamia", "name": "MAMIA BEDDING", "con": [{ "id": "combo-chan-ga-goi", "name": "Bộ Chăn Ga Gối" }, { "id": "chan", "name": "Chăn" }, { "id": "ga", "name": "Ga" }, { "id": "goi-ngu", "name": "Gối ngủ" }, { "id": "goi-tua", "name": "Gối tựa" }, { "id": "goi-om", "name": "Gối ôm" }, { "id": "goi-yoga", "name": "Gối tập yoga" }] }, { "id": "umi", "name": "GỐM SỨ UMI", "con": [{ "id": "bat-dia-to", "name": "Bát - Đĩa - Tô" }, { "id": "coc-ly", "name": "Cốc & Ly" }, { "id": "am-tra-bo-am-tra", "name": "Ấm trà - Bộ ấm trà" }, { "id": "dung-cu-nau-nuong", "name": "Dụng cụ nhà bếp" }, { "id": "gia-do-dung-cu-dung", "name": "Giá đỡ - Dụng cụ đựng" }, { "id": "khan-trai-ban", "name": "Khăn trải bàn" }] }, { "id": "xi-xinh", "name": "XÍ XINH", "con": [{ "id": "tham-phong-tam", "name": "Thảm phòng tắm" }, { "id": "rem-tam", "name": "Rèm tắm" }, { "id": "dung-cu-phong-tam", "name": "Vật dụng phòng tắm" }] }, { "id": "outlet", "name": "OUTLET", "con": [{ "id": "noi-that", "name": "Đồ nội thất" }, { "id": "trang-tri-phong", "name": "Đồ trang trí" }] }]

function CrawlData(tl, page) {
    return new Promise((res, rej) => {
        fetch(`https://baya.vn/collections/${tl}?view=data&page=${page}&sort_by=created-descending`)
            .then((v) => {
                v.arrayBuffer()
                    .then((vv) => {
                        const s = Buffer.from(vv).toString()
                        let datas = []
                        let script = 0
                        let phay = 0
                        while (true) {
                            script = s.indexOf('<script async>', phay)
                            if (script == -1) {
                                break
                            }
                            let qe = s.indexOf("=", script)
                            phay = s.indexOf("};", qe)
                            let data = s.slice(qe + 1, phay).trimStart() + "}"



                            if (data) {
                                datas.push(JSON.parse(data))

                            }

                        }
                        res(datas.map((v) => {
                            return { ...v, category: tl }
                        }))


                    })
                    .catch((v) => {

                        res(null)

                    })
            })
    })
}


let f = []

for (let i = 0; i < tl.length; i++) {
    const element = tl[i];
    for (let j = 0; j < element.con.length; j++) {
        const element2 = element.con[j];
        let page = 1
        let fs1 = await CrawlData(element2.id, page)
        while (fs1.length > 0) {
            f.push(...fs1)
            page += 1
            fs1 = await CrawlData(element2.id, page)
        }
    }
}
fs.writeFileSync("./test_crawl.json", JSON.stringify(f))
