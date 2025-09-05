const fs = require("fs")
const data = require("./crawl_data.json")
// let s = {
//     "available": true,
//     "compare_at_price_max": 82000000,
//     "compare_at_price_min": 70000000,
//     "compare_at_price_varies": true,
//     "compare_at_price": 82000000,
//     "content": null,
//     "featured_image": "https://cdn.hstatic.net/products/200000796751/soi_tre_2_fdc32481b7e94b5f8b66e0ec283336d1.jpg",
//     "handle": "set-4-mon-cotton-soi-tre",
//     "id": 1068272104,
//     "images": [
//         "https://cdn.hstatic.net/products/200000796751/soi_tre_2_fdc32481b7e94b5f8b66e0ec283336d1.jpg",
//         "https://cdn.hstatic.net/products/200000796751/z6828882636442_181eb90187b2086f32bb91e9e76bec8f_55f10125d1c04e38b2b13364a7d15bcf.jpg",
//         "https://cdn.hstatic.net/products/200000796751/z6828866296423_49d09a293647f088d444fee6e12fbfa9_2f3e3da08ee340bbabb82da6b99eba31.jpg",
//         "https://cdn.hstatic.net/products/200000796751/z6828866283706_79e9ae6332c74f7cbaa0b73d114460a1_a18cbd27a3ef44f589dd021e634dd069.jpg",
//         "https://cdn.hstatic.net/products/200000796751/z6828866264316_cda91424b0e467a881e494a2d3330953_a368a072d9b541bba2b883a314024f30.jpg",
//         "https://cdn.hstatic.net/products/200000796751/z6828866264269_97e6b0e310f1342e7394682b3774d2c8_843c3485e01d408da074ef3abf47518c.jpg"
//     ],
//     "options": [
//         "Màu sắc",
//         "Kích thước",
//         "Độ dày nệm"
//     ],
//     "price": 70000000,
//     "price_max": 82000000,
//     "price_min": 70000000,
//     "price_varies": true,
//     "tags": [],
//     "template_suffix": null,
//     "title": "Set ga gối 4 món Cotton Sợi Tre",
//     "type": "Khác",
//     "url": "/products/set-4-mon-cotton-soi-tre",
//     "pagetitle": "Set 4 món Cotton Sợi Tre",
//     "metadescription": "Set Chăn Ga Gối Cotton Sợi Tre Mềm Mịn – Nâng tầm giấc ngủ sang trọng Trải nghiệm sự mát mẻ, mềm mại và sang trọng tối ưu với Set 4 món Chăn Ga Gối Cotton Sợi Tre từ Baya, lựa chọn hoàn hảo cho không gian phòng ngủ hiện đại và đẳng cấp.Chất liệu cotton sợi tre cao cấp: Kết hợp hoàn hảo giữa sợi tre tự nhiên và sợi cott",
//     "variants": [
//         {
//             "id": 1155482797,
//             "barcode": "2002788-1",
//             "available": true,
//             "price": 70000000,
//             "sku": "2002788-1",
//             "option1": "Cherry cam",
//             "option2": "1m6 x 2m",
//             "option3": "15cm",
//             "options": [
//                 "Cherry cam",
//                 "1m6 x 2m",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Cherry cam / 1m6 x 2m / 15cm",
//             "weight": 3000,
//             "compare_at_price": 70000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1581724721,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 1,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/soi_tre_2_fdc32481b7e94b5f8b66e0ec283336d1.jpg",
//                 "variant_ids": [
//                     1155482797,
//                     1155482798,
//                     1155482799,
//                     1155482800,
//                     1155482801,
//                     1155482802
//                 ]
//             }
//         },
//         {
//             "id": 1155482798,
//             "barcode": "2002788-2",
//             "available": true,
//             "price": 72000000,
//             "sku": "2002788-2",
//             "option1": "Cherry cam",
//             "option2": "1m6 x 2m",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Cherry cam",
//                 "1m6 x 2m",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Cherry cam / 1m6 x 2m / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 72000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1581724721,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 1,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/soi_tre_2_fdc32481b7e94b5f8b66e0ec283336d1.jpg",
//                 "variant_ids": [
//                     1155482797,
//                     1155482798,
//                     1155482799,
//                     1155482800,
//                     1155482801,
//                     1155482802
//                 ]
//             }
//         },
//         {
//             "id": 1155482799,
//             "barcode": "2002788-3",
//             "available": true,
//             "price": 75000000,
//             "sku": "2002788-3",
//             "option1": "Cherry cam",
//             "option2": "1m8 x 2m",
//             "option3": "15cm",
//             "options": [
//                 "Cherry cam",
//                 "1m8 x 2m",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Cherry cam / 1m8 x 2m / 15cm",
//             "weight": 3000,
//             "compare_at_price": 75000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1581724721,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 1,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/soi_tre_2_fdc32481b7e94b5f8b66e0ec283336d1.jpg",
//                 "variant_ids": [
//                     1155482797,
//                     1155482798,
//                     1155482799,
//                     1155482800,
//                     1155482801,
//                     1155482802
//                 ]
//             }
//         },
//         {
//             "id": 1155482800,
//             "barcode": "2002788-4",
//             "available": true,
//             "price": 77000000,
//             "sku": "2002788-4",
//             "option1": "Cherry cam",
//             "option2": "1m8 x 2m",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Cherry cam",
//                 "1m8 x 2m",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Cherry cam / 1m8 x 2m / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 77000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1581724721,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 1,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/soi_tre_2_fdc32481b7e94b5f8b66e0ec283336d1.jpg",
//                 "variant_ids": [
//                     1155482797,
//                     1155482798,
//                     1155482799,
//                     1155482800,
//                     1155482801,
//                     1155482802
//                 ]
//             }
//         },
//         {
//             "id": 1155482801,
//             "barcode": "2002788-5",
//             "available": true,
//             "price": 80000000,
//             "sku": "2002788-5",
//             "option1": "Cherry cam",
//             "option2": "2m x 2m2",
//             "option3": "15cm",
//             "options": [
//                 "Cherry cam",
//                 "2m x 2m2",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Cherry cam / 2m x 2m2 / 15cm",
//             "weight": 3000,
//             "compare_at_price": 80000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1581724721,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 1,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/soi_tre_2_fdc32481b7e94b5f8b66e0ec283336d1.jpg",
//                 "variant_ids": [
//                     1155482797,
//                     1155482798,
//                     1155482799,
//                     1155482800,
//                     1155482801,
//                     1155482802
//                 ]
//             }
//         },
//         {
//             "id": 1155482802,
//             "barcode": "2002788-6",
//             "available": true,
//             "price": 82000000,
//             "sku": "2002788-6",
//             "option1": "Cherry cam",
//             "option2": "2m x 2m2",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Cherry cam",
//                 "2m x 2m2",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Cherry cam / 2m x 2m2 / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 82000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1581724721,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 1,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/soi_tre_2_fdc32481b7e94b5f8b66e0ec283336d1.jpg",
//                 "variant_ids": [
//                     1155482797,
//                     1155482798,
//                     1155482799,
//                     1155482800,
//                     1155482801,
//                     1155482802
//                 ]
//             }
//         },
//         {
//             "id": 1155482803,
//             "barcode": "2002788-7",
//             "available": true,
//             "price": 70000000,
//             "sku": "2002788-7",
//             "option1": "Mèo xanh",
//             "option2": "1m6 x 2m",
//             "option3": "15cm",
//             "options": [
//                 "Mèo xanh",
//                 "1m6 x 2m",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Mèo xanh / 1m6 x 2m / 15cm",
//             "weight": 3000,
//             "compare_at_price": 70000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965909,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 4,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866283706_79e9ae6332c74f7cbaa0b73d114460a1_a18cbd27a3ef44f589dd021e634dd069.jpg",
//                 "variant_ids": [
//                     1155482803,
//                     1155482804,
//                     1155482805,
//                     1155482806,
//                     1155482807,
//                     1155482808
//                 ]
//             }
//         },
//         {
//             "id": 1155482804,
//             "barcode": "2002788-8",
//             "available": true,
//             "price": 72000000,
//             "sku": "2002788-8",
//             "option1": "Mèo xanh",
//             "option2": "1m6 x 2m",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Mèo xanh",
//                 "1m6 x 2m",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Mèo xanh / 1m6 x 2m / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 72000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965909,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 4,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866283706_79e9ae6332c74f7cbaa0b73d114460a1_a18cbd27a3ef44f589dd021e634dd069.jpg",
//                 "variant_ids": [
//                     1155482803,
//                     1155482804,
//                     1155482805,
//                     1155482806,
//                     1155482807,
//                     1155482808
//                 ]
//             }
//         },
//         {
//             "id": 1155482805,
//             "barcode": "2002788-9",
//             "available": true,
//             "price": 75000000,
//             "sku": "2002788-9",
//             "option1": "Mèo xanh",
//             "option2": "1m8 x 2m",
//             "option3": "15cm",
//             "options": [
//                 "Mèo xanh",
//                 "1m8 x 2m",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Mèo xanh / 1m8 x 2m / 15cm",
//             "weight": 3000,
//             "compare_at_price": 75000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965909,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 4,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866283706_79e9ae6332c74f7cbaa0b73d114460a1_a18cbd27a3ef44f589dd021e634dd069.jpg",
//                 "variant_ids": [
//                     1155482803,
//                     1155482804,
//                     1155482805,
//                     1155482806,
//                     1155482807,
//                     1155482808
//                 ]
//             }
//         },
//         {
//             "id": 1155482806,
//             "barcode": "2002788-10",
//             "available": true,
//             "price": 77000000,
//             "sku": "2002788-10",
//             "option1": "Mèo xanh",
//             "option2": "1m8 x 2m",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Mèo xanh",
//                 "1m8 x 2m",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Mèo xanh / 1m8 x 2m / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 77000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965909,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 4,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866283706_79e9ae6332c74f7cbaa0b73d114460a1_a18cbd27a3ef44f589dd021e634dd069.jpg",
//                 "variant_ids": [
//                     1155482803,
//                     1155482804,
//                     1155482805,
//                     1155482806,
//                     1155482807,
//                     1155482808
//                 ]
//             }
//         },
//         {
//             "id": 1155482807,
//             "barcode": "2002788-11",
//             "available": true,
//             "price": 80000000,
//             "sku": "2002788-11",
//             "option1": "Mèo xanh",
//             "option2": "2m x 2m2",
//             "option3": "15cm",
//             "options": [
//                 "Mèo xanh",
//                 "2m x 2m2",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Mèo xanh / 2m x 2m2 / 15cm",
//             "weight": 3000,
//             "compare_at_price": 80000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965909,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 4,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866283706_79e9ae6332c74f7cbaa0b73d114460a1_a18cbd27a3ef44f589dd021e634dd069.jpg",
//                 "variant_ids": [
//                     1155482803,
//                     1155482804,
//                     1155482805,
//                     1155482806,
//                     1155482807,
//                     1155482808
//                 ]
//             }
//         },
//         {
//             "id": 1155482808,
//             "barcode": "2002788-12",
//             "available": true,
//             "price": 82000000,
//             "sku": "2002788-12",
//             "option1": "Mèo xanh",
//             "option2": "2m x 2m2",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Mèo xanh",
//                 "2m x 2m2",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Mèo xanh / 2m x 2m2 / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 82000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965909,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 4,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866283706_79e9ae6332c74f7cbaa0b73d114460a1_a18cbd27a3ef44f589dd021e634dd069.jpg",
//                 "variant_ids": [
//                     1155482803,
//                     1155482804,
//                     1155482805,
//                     1155482806,
//                     1155482807,
//                     1155482808
//                 ]
//             }
//         },
//         {
//             "id": 1155482809,
//             "barcode": "2002788-13",
//             "available": true,
//             "price": 70000000,
//             "sku": "2002788-13",
//             "option1": "Cá sắc màu",
//             "option2": "1m6 x 2m",
//             "option3": "15cm",
//             "options": [
//                 "Cá sắc màu",
//                 "1m6 x 2m",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Cá sắc màu / 1m6 x 2m / 15cm",
//             "weight": 3000,
//             "compare_at_price": 70000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965907,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 5,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866264316_cda91424b0e467a881e494a2d3330953_a368a072d9b541bba2b883a314024f30.jpg",
//                 "variant_ids": [
//                     1155482809,
//                     1155482810,
//                     1155482811,
//                     1155482812,
//                     1155482813,
//                     1155482814
//                 ]
//             }
//         },
//         {
//             "id": 1155482810,
//             "barcode": "2002788-14",
//             "available": true,
//             "price": 72000000,
//             "sku": "2002788-14",
//             "option1": "Cá sắc màu",
//             "option2": "1m6 x 2m",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Cá sắc màu",
//                 "1m6 x 2m",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Cá sắc màu / 1m6 x 2m / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 72000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965907,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 5,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866264316_cda91424b0e467a881e494a2d3330953_a368a072d9b541bba2b883a314024f30.jpg",
//                 "variant_ids": [
//                     1155482809,
//                     1155482810,
//                     1155482811,
//                     1155482812,
//                     1155482813,
//                     1155482814
//                 ]
//             }
//         },
//         {
//             "id": 1155482811,
//             "barcode": "2002788-15",
//             "available": true,
//             "price": 75000000,
//             "sku": "2002788-15",
//             "option1": "Cá sắc màu",
//             "option2": "1m8 x 2m",
//             "option3": "15cm",
//             "options": [
//                 "Cá sắc màu",
//                 "1m8 x 2m",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Cá sắc màu / 1m8 x 2m / 15cm",
//             "weight": 3000,
//             "compare_at_price": 75000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965907,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 5,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866264316_cda91424b0e467a881e494a2d3330953_a368a072d9b541bba2b883a314024f30.jpg",
//                 "variant_ids": [
//                     1155482809,
//                     1155482810,
//                     1155482811,
//                     1155482812,
//                     1155482813,
//                     1155482814
//                 ]
//             }
//         },
//         {
//             "id": 1155482812,
//             "barcode": "2002788-16",
//             "available": true,
//             "price": 77000000,
//             "sku": "2002788-16",
//             "option1": "Cá sắc màu",
//             "option2": "1m8 x 2m",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Cá sắc màu",
//                 "1m8 x 2m",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Cá sắc màu / 1m8 x 2m / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 77000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965907,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 5,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866264316_cda91424b0e467a881e494a2d3330953_a368a072d9b541bba2b883a314024f30.jpg",
//                 "variant_ids": [
//                     1155482809,
//                     1155482810,
//                     1155482811,
//                     1155482812,
//                     1155482813,
//                     1155482814
//                 ]
//             }
//         },
//         {
//             "id": 1155482813,
//             "barcode": "2002788-17",
//             "available": true,
//             "price": 80000000,
//             "sku": "2002788-17",
//             "option1": "Cá sắc màu",
//             "option2": "2m x 2m2",
//             "option3": "15cm",
//             "options": [
//                 "Cá sắc màu",
//                 "2m x 2m2",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Cá sắc màu / 2m x 2m2 / 15cm",
//             "weight": 3000,
//             "compare_at_price": 80000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965907,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 5,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866264316_cda91424b0e467a881e494a2d3330953_a368a072d9b541bba2b883a314024f30.jpg",
//                 "variant_ids": [
//                     1155482809,
//                     1155482810,
//                     1155482811,
//                     1155482812,
//                     1155482813,
//                     1155482814
//                 ]
//             }
//         },
//         {
//             "id": 1155482814,
//             "barcode": "2002788-18",
//             "available": true,
//             "price": 82000000,
//             "sku": "2002788-18",
//             "option1": "Cá sắc màu",
//             "option2": "2m x 2m2",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Cá sắc màu",
//                 "2m x 2m2",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Cá sắc màu / 2m x 2m2 / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 82000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965907,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 5,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866264316_cda91424b0e467a881e494a2d3330953_a368a072d9b541bba2b883a314024f30.jpg",
//                 "variant_ids": [
//                     1155482809,
//                     1155482810,
//                     1155482811,
//                     1155482812,
//                     1155482813,
//                     1155482814
//                 ]
//             }
//         },
//         {
//             "id": 1155482815,
//             "barcode": "2002788-19",
//             "available": true,
//             "price": 70000000,
//             "sku": "2002788-19",
//             "option1": "Hoa tím",
//             "option2": "1m6 x 2m",
//             "option3": "15cm",
//             "options": [
//                 "Hoa tím",
//                 "1m6 x 2m",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa tím / 1m6 x 2m / 15cm",
//             "weight": 3000,
//             "compare_at_price": 70000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965911,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 3,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866296423_49d09a293647f088d444fee6e12fbfa9_2f3e3da08ee340bbabb82da6b99eba31.jpg",
//                 "variant_ids": [
//                     1155482815,
//                     1155482816,
//                     1155482817,
//                     1155482818,
//                     1155482819,
//                     1155482820
//                 ]
//             }
//         },
//         {
//             "id": 1155482816,
//             "barcode": "2002788-20",
//             "available": true,
//             "price": 72000000,
//             "sku": "2002788-20",
//             "option1": "Hoa tím",
//             "option2": "1m6 x 2m",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Hoa tím",
//                 "1m6 x 2m",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa tím / 1m6 x 2m / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 72000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965911,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 3,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866296423_49d09a293647f088d444fee6e12fbfa9_2f3e3da08ee340bbabb82da6b99eba31.jpg",
//                 "variant_ids": [
//                     1155482815,
//                     1155482816,
//                     1155482817,
//                     1155482818,
//                     1155482819,
//                     1155482820
//                 ]
//             }
//         },
//         {
//             "id": 1155482817,
//             "barcode": "2002788-21",
//             "available": true,
//             "price": 75000000,
//             "sku": "2002788-21",
//             "option1": "Hoa tím",
//             "option2": "1m8 x 2m",
//             "option3": "15cm",
//             "options": [
//                 "Hoa tím",
//                 "1m8 x 2m",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa tím / 1m8 x 2m / 15cm",
//             "weight": 3000,
//             "compare_at_price": 75000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965911,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 3,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866296423_49d09a293647f088d444fee6e12fbfa9_2f3e3da08ee340bbabb82da6b99eba31.jpg",
//                 "variant_ids": [
//                     1155482815,
//                     1155482816,
//                     1155482817,
//                     1155482818,
//                     1155482819,
//                     1155482820
//                 ]
//             }
//         },
//         {
//             "id": 1155482818,
//             "barcode": "2002788-22",
//             "available": true,
//             "price": 77000000,
//             "sku": "2002788-22",
//             "option1": "Hoa tím",
//             "option2": "1m8 x 2m",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Hoa tím",
//                 "1m8 x 2m",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa tím / 1m8 x 2m / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 77000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965911,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 3,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866296423_49d09a293647f088d444fee6e12fbfa9_2f3e3da08ee340bbabb82da6b99eba31.jpg",
//                 "variant_ids": [
//                     1155482815,
//                     1155482816,
//                     1155482817,
//                     1155482818,
//                     1155482819,
//                     1155482820
//                 ]
//             }
//         },
//         {
//             "id": 1155482819,
//             "barcode": "2002788-23",
//             "available": true,
//             "price": 80000000,
//             "sku": "2002788-23",
//             "option1": "Hoa tím",
//             "option2": "2m x 2m2",
//             "option3": "15cm",
//             "options": [
//                 "Hoa tím",
//                 "2m x 2m2",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa tím / 2m x 2m2 / 15cm",
//             "weight": 3000,
//             "compare_at_price": 80000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965911,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 3,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866296423_49d09a293647f088d444fee6e12fbfa9_2f3e3da08ee340bbabb82da6b99eba31.jpg",
//                 "variant_ids": [
//                     1155482815,
//                     1155482816,
//                     1155482817,
//                     1155482818,
//                     1155482819,
//                     1155482820
//                 ]
//             }
//         },
//         {
//             "id": 1155482820,
//             "barcode": "2002788-24",
//             "available": true,
//             "price": 82000000,
//             "sku": "2002788-24",
//             "option1": "Hoa tím",
//             "option2": "2m x 2m2",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Hoa tím",
//                 "2m x 2m2",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa tím / 2m x 2m2 / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 82000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965911,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 3,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866296423_49d09a293647f088d444fee6e12fbfa9_2f3e3da08ee340bbabb82da6b99eba31.jpg",
//                 "variant_ids": [
//                     1155482815,
//                     1155482816,
//                     1155482817,
//                     1155482818,
//                     1155482819,
//                     1155482820
//                 ]
//             }
//         },
//         {
//             "id": 1155482821,
//             "barcode": "2002788-25",
//             "available": true,
//             "price": 70000000,
//             "sku": "2002788-25",
//             "option1": "Hoa hồng be",
//             "option2": "1m6 x 2m",
//             "option3": "15cm",
//             "options": [
//                 "Hoa hồng be",
//                 "1m6 x 2m",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa hồng be / 1m6 x 2m / 15cm",
//             "weight": 3000,
//             "compare_at_price": 70000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965906,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 6,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866264269_97e6b0e310f1342e7394682b3774d2c8_843c3485e01d408da074ef3abf47518c.jpg",
//                 "variant_ids": [
//                     1155482821,
//                     1155482822,
//                     1155482823,
//                     1155482824,
//                     1155482825,
//                     1155482826
//                 ]
//             }
//         },
//         {
//             "id": 1155482822,
//             "barcode": "2002788-26",
//             "available": true,
//             "price": 72000000,
//             "sku": "2002788-26",
//             "option1": "Hoa hồng be",
//             "option2": "1m6 x 2m",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Hoa hồng be",
//                 "1m6 x 2m",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa hồng be / 1m6 x 2m / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 72000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965906,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 6,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866264269_97e6b0e310f1342e7394682b3774d2c8_843c3485e01d408da074ef3abf47518c.jpg",
//                 "variant_ids": [
//                     1155482821,
//                     1155482822,
//                     1155482823,
//                     1155482824,
//                     1155482825,
//                     1155482826
//                 ]
//             }
//         },
//         {
//             "id": 1155482823,
//             "barcode": "2002788-27",
//             "available": true,
//             "price": 75000000,
//             "sku": "2002788-27",
//             "option1": "Hoa hồng be",
//             "option2": "1m8 x 2m",
//             "option3": "15cm",
//             "options": [
//                 "Hoa hồng be",
//                 "1m8 x 2m",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa hồng be / 1m8 x 2m / 15cm",
//             "weight": 3000,
//             "compare_at_price": 75000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965906,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 6,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866264269_97e6b0e310f1342e7394682b3774d2c8_843c3485e01d408da074ef3abf47518c.jpg",
//                 "variant_ids": [
//                     1155482821,
//                     1155482822,
//                     1155482823,
//                     1155482824,
//                     1155482825,
//                     1155482826
//                 ]
//             }
//         },
//         {
//             "id": 1155482824,
//             "barcode": "2002788-28",
//             "available": true,
//             "price": 77000000,
//             "sku": "2002788-28",
//             "option1": "Hoa hồng be",
//             "option2": "1m8 x 2m",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Hoa hồng be",
//                 "1m8 x 2m",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa hồng be / 1m8 x 2m / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 77000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965906,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 6,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866264269_97e6b0e310f1342e7394682b3774d2c8_843c3485e01d408da074ef3abf47518c.jpg",
//                 "variant_ids": [
//                     1155482821,
//                     1155482822,
//                     1155482823,
//                     1155482824,
//                     1155482825,
//                     1155482826
//                 ]
//             }
//         },
//         {
//             "id": 1155482825,
//             "barcode": "2002788-29",
//             "available": true,
//             "price": 80000000,
//             "sku": "2002788-29",
//             "option1": "Hoa hồng be",
//             "option2": "2m x 2m2",
//             "option3": "15cm",
//             "options": [
//                 "Hoa hồng be",
//                 "2m x 2m2",
//                 "15cm"
//             ],
//             "inventory_quantity": -1,
//             "old_inventory_quantity": -1,
//             "title": "Hoa hồng be / 2m x 2m2 / 15cm",
//             "weight": 3000,
//             "compare_at_price": 80000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965906,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 6,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866264269_97e6b0e310f1342e7394682b3774d2c8_843c3485e01d408da074ef3abf47518c.jpg",
//                 "variant_ids": [
//                     1155482821,
//                     1155482822,
//                     1155482823,
//                     1155482824,
//                     1155482825,
//                     1155482826
//                 ]
//             }
//         },
//         {
//             "id": 1155482826,
//             "barcode": "2002788-30",
//             "available": true,
//             "price": 82000000,
//             "sku": "2002788-30",
//             "option1": "Hoa hồng be",
//             "option2": "2m x 2m2",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Hoa hồng be",
//                 "2m x 2m2",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa hồng be / 2m x 2m2 / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 82000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589965906,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 6,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828866264269_97e6b0e310f1342e7394682b3774d2c8_843c3485e01d408da074ef3abf47518c.jpg",
//                 "variant_ids": [
//                     1155482821,
//                     1155482822,
//                     1155482823,
//                     1155482824,
//                     1155482825,
//                     1155482826
//                 ]
//             }
//         },
//         {
//             "id": 1156843994,
//             "barcode": "2002788-31",
//             "available": true,
//             "price": 70000000,
//             "sku": "2002788-31",
//             "option1": "Hoa nhí cam",
//             "option2": "1m6 x 2m",
//             "option3": "15cm",
//             "options": [
//                 "Hoa nhí cam",
//                 "1m6 x 2m",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa nhí cam / 1m6 x 2m / 15cm",
//             "weight": 3000,
//             "compare_at_price": 70000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589932928,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 2,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828882636442_181eb90187b2086f32bb91e9e76bec8f_55f10125d1c04e38b2b13364a7d15bcf.jpg",
//                 "variant_ids": [
//                     1156843994,
//                     1156843995,
//                     1156843996,
//                     1156843997,
//                     1156843998,
//                     1156843999
//                 ]
//             }
//         },
//         {
//             "id": 1156843995,
//             "barcode": "2002788-32",
//             "available": true,
//             "price": 72000000,
//             "sku": "2002788-32",
//             "option1": "Hoa nhí cam",
//             "option2": "1m6 x 2m",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Hoa nhí cam",
//                 "1m6 x 2m",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa nhí cam / 1m6 x 2m / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 72000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589932928,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 2,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828882636442_181eb90187b2086f32bb91e9e76bec8f_55f10125d1c04e38b2b13364a7d15bcf.jpg",
//                 "variant_ids": [
//                     1156843994,
//                     1156843995,
//                     1156843996,
//                     1156843997,
//                     1156843998,
//                     1156843999
//                 ]
//             }
//         },
//         {
//             "id": 1156843996,
//             "barcode": "2002788-33",
//             "available": true,
//             "price": 75000000,
//             "sku": "2002788-33",
//             "option1": "Hoa nhí cam",
//             "option2": "1m8 x 2m",
//             "option3": "15cm",
//             "options": [
//                 "Hoa nhí cam",
//                 "1m8 x 2m",
//                 "15cm"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa nhí cam / 1m8 x 2m / 15cm",
//             "weight": 3000,
//             "compare_at_price": 75000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589932928,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 2,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828882636442_181eb90187b2086f32bb91e9e76bec8f_55f10125d1c04e38b2b13364a7d15bcf.jpg",
//                 "variant_ids": [
//                     1156843994,
//                     1156843995,
//                     1156843996,
//                     1156843997,
//                     1156843998,
//                     1156843999
//                 ]
//             }
//         },
//         {
//             "id": 1156843997,
//             "barcode": "2002788-34",
//             "available": true,
//             "price": 77000000,
//             "sku": "2002788-34",
//             "option1": "Hoa nhí cam",
//             "option2": "1m8 x 2m",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Hoa nhí cam",
//                 "1m8 x 2m",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa nhí cam / 1m8 x 2m / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 77000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589932928,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 2,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828882636442_181eb90187b2086f32bb91e9e76bec8f_55f10125d1c04e38b2b13364a7d15bcf.jpg",
//                 "variant_ids": [
//                     1156843994,
//                     1156843995,
//                     1156843996,
//                     1156843997,
//                     1156843998,
//                     1156843999
//                 ]
//             }
//         },
//         {
//             "id": 1156843998,
//             "barcode": "2002788-35",
//             "available": true,
//             "price": 80000000,
//             "sku": "2002788-35",
//             "option1": "Hoa nhí cam",
//             "option2": "2m x 2m2",
//             "option3": "15cm",
//             "options": [
//                 "Hoa nhí cam",
//                 "2m x 2m2",
//                 "15cm"
//             ],
//             "inventory_quantity": -1,
//             "old_inventory_quantity": -1,
//             "title": "Hoa nhí cam / 2m x 2m2 / 15cm",
//             "weight": 3000,
//             "compare_at_price": 80000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589932928,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 2,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828882636442_181eb90187b2086f32bb91e9e76bec8f_55f10125d1c04e38b2b13364a7d15bcf.jpg",
//                 "variant_ids": [
//                     1156843994,
//                     1156843995,
//                     1156843996,
//                     1156843997,
//                     1156843998,
//                     1156843999
//                 ]
//             }
//         },
//         {
//             "id": 1156843999,
//             "barcode": "2002788-36",
//             "available": true,
//             "price": 82000000,
//             "sku": "2002788-36",
//             "option1": "Hoa nhí cam",
//             "option2": "2m x 2m2",
//             "option3": "Ga phủ (20cm)",
//             "options": [
//                 "Hoa nhí cam",
//                 "2m x 2m2",
//                 "Ga phủ (20cm)"
//             ],
//             "inventory_quantity": 0,
//             "old_inventory_quantity": 0,
//             "title": "Hoa nhí cam / 2m x 2m2 / Ga phủ (20cm)",
//             "weight": 3000,
//             "compare_at_price": 82000000,
//             "inventory_management": "haravan",
//             "inventory_policy": "continue",
//             "selected": false,
//             "url": null,
//             "featured_image": {
//                 "id": 1589932928,
//                 "created_at": "0001-01-01T00:00:00",
//                 "position": 2,
//                 "product_id": 1068272104,
//                 "updated_at": "0001-01-01T00:00:00",
//                 "src": "https://cdn.hstatic.net/products/200000796751/z6828882636442_181eb90187b2086f32bb91e9e76bec8f_55f10125d1c04e38b2b13364a7d15bcf.jpg",
//                 "variant_ids": [
//                     1156843994,
//                     1156843995,
//                     1156843996,
//                     1156843997,
//                     1156843998,
//                     1156843999
//                 ]
//             }
//         }
//     ],
//     "vendor": "MAMIA",
//     "published_at": "2025-07-22T03:59:47.324Z",
//     "created_at": "2025-07-02T08:45:20.958Z",
//     "not_allow_promotion": false
// }

// public class ProductEntity
// {

//     [Key]
//     public string ProductId { get; set; } = Guid.NewGuid().ToString();
//     public required string Description { get; set; }

//     public required string ProductClassification { get; set; }

//     public required long MainPrice { get; set; }

//     [StringLength(30, ErrorMessage = "quá dài")]
//     public required string NameProduct { get; set; }

//     public required long Quality { get; set; } = 0;
//     public required string Measure { get; set; }
//     public required int Value { get; set; }

//     public ICollection<ProductVariantEntity>? ProductVariantEntities { get; set; }


//     public required CategoryEntity? CategoryEntity { get; set; }
//     public ICollection<ImageEntity>? ImageEntities { get; set; }

// }


// public required string VariantId { get; set; } = new Guid().ToString();
// public required string VariantName { get; set; }
// public required long Price { get; set; }
// public required int Image { get; set; }
// public required long Quality { get; set; } = 0;


function Convert(params) {
    let ii = 0
    let op = []
    params.options.forEach((v) => {
        op.push({ 'name': v, options: [] })
    })
    let opv = {}

    params.variants.forEach(element => {
        let ops = element.options
        ops.forEach((v, i) => {
            if (opv[v] == undefined) {
                op[i].options.push({ id: Date.now() + ii + Math.round(Math.random() * 100000), name: v })
                opv[v] = true
            }
            ii += 1
        })
    });


    return op
}


function ConvertProduct(params) {
    let op = Convert(params)
    let f = {

        nameProduct: params.title,
        mainPrice: params.price,
        suplier: params.vendor,
        slug: params.handle,
        typeProduct: params.category,
        description: params.description || "",
        productClassification: JSON.stringify(op),
        quality: params.variants.reduce((preValue, cur) => {
            return cur.inventory_quantity + preValue
        }, 0),
        imageFiles: params.images,
        productVariants: params.variants.reduce((preValue, cur) => {
            let variantId = "";
            let variantName = ""
            cur.options.forEach((v, i) => {
                variantName += `${v} `
                op[i].options.forEach((op1) => {
                    if (op1.name == v) {
                        variantId += `${op1.id} `
                    }
                })
            })

            return [...preValue, {
                productVariantId: cur.id+"",
                variantId: variantId.trim(),
                variantName: variantName.trim(),
                price: cur.price,
                quality: cur.old_inventory_quantity,
                image: cur.featured_image?.src || params.images[0],
                position: cur.featured_image?.position || 0,
                weight: cur.weight
            }]
        }, [])
    }
    return f
}

// fs.writeFileSync("./test.json", JSON.stringify(ConvertProduct(s)))

var dataTmp = []

for (let i = 0; i < data.length; i++) {
    const element = data[i];
    console.log(element.id);
    dataTmp.push(ConvertProduct(element))


}


fs.writeFileSync("./dataTmp.json", JSON.stringify(dataTmp))