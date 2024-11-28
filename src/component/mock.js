const order_data = {
    totalCount: 1,
    results: [{
        id: 1,
        customer_id: "1",
        customer_name: "Nguyễn Văn A",
        departure: "Hải Phòng",
        arrival: "Hà Nội",
        start_date: "2024-11-1",
        end_date: "2024-11-3",
        material: "Vật liệu",
        weight: "10",
        driver_id: 1,
        driver_name: "Nguyễn Văn A",
        truck_id: 1,
        truck_license_plate: "15U1-12233",
        pricing: 1300000,
        tolls: 200000,
        status: 1,
        deliver_status: 2,
        payment_status: 1
    }]
}

const driver_data = {
    totalCount: 1,
    results: [
        {
            id: 1,
            name: "Nguyễn Văn A",
            birthday: "1997-1-11",
            gender: 1,
            phone_number: "09282828282",
            status: 1,
        }
    ]
}

const truck_data = {
    totalCount: 1,
    results: [
        {
            id: 1,
            name: "Xe 1",
            license_plate: "15U1-17171",
            cat_id: 1,
            status: 1,
        }
    ]
}

const user_data = {
    totalCount: 2,
    results: [
        {
            id: 1,
            fullname: "Nguyễn Văn A",
            birthday: "1996-1-11",
            gender: 1,
            position: "admin",
            address: "Hà Nội",
            phone_number: "0981818181",
            start_date: "2023-2-10",
            end_data: "",
            status: 1,
            is_admin: 1,
            username: "admin",
            password: "123456",
        },
        {
            id: 2,
            fullname: "Nguyễn Thị B",
            birthday: "1996-1-11",
            gender: 2,
            position: "user",
            address: "Hà Nội",
            phone_number: "0981818181",
            start_date: "2023-2-10",
            end_data: "",
            status: 1,
            is_admin: 0,
            username: "user",
            password: "123456",
        }
    ]
}

const dashboard_data = {
    Customer: 10,
    Order: 21,
    User: 5,
    Driver: 12,
    Truck: 12,
    UnavaiableTruck: 2
}

const revenue_data = {
    totalCount: 1,
    results: [
        {
            id: 1,
            key: "Doanh thu bán hàng và cung cấp dịch vụ",
            value: 1656626843
        },
        {
            id: 2,
            key: "Các khoản giảm trừ doanh thu",
            value: 0
        },
        {
            id: 3,
            key: "Giá vốn hàng bán",
            value: 1372427559
        },
        {
            id: 4,
            key: "Lợi nhuận gộp về bán hàng và cung cấp dịch vụ",
            value: 284199284
        },
        {
            id: 5,
            key: "Thuế thu nhập doanh nghiệp",
            value: 56839856
        },
        {
            id: 6,
            key: "Lợi nhuận sau thuế thu nhập doanh nghiệp",
            value: 227359427
        },
    ]
}

const award_data = {
    totalCount: 12,
    results: [
        {
            id: 1,
            name: "Nguyễn Văn Hùng",
            identification: "012345678901",
            delivers: 10
        },
        {
            id: 2,
            name: "Trần Văn Minh",
            identification: "123456789012",
            delivers: 21
        },
        {
            id: 3,
            name: "Phạm Hữu Tài",
            identification: "234567890123",
            delivers: 24
        },
        {
            id: 4,
            name: "Lê Quốc Thắng",
            identification: "345678901234",
            delivers: 11
        },
        {
            id: 5,
            name: "Hoàng Văn Tuấn",
            identification: "456789012345",
            delivers: 12
        },
        {
            id: 6,
            name: "Đỗ Anh Dũng",
            identification: "567890123456",
            delivers: 23
        },
        {
            id: 7,
            name: "Bùi Ngọc Phát",
            identification: "678901234567",
            delivers: 19
        },
        {
            id: 8,
            name: "Nguyễn Văn Phúc",
            identification: "789012345678",
            delivers: 16
        },
        {
            id: 9,
            name: "Trần Thanh Sơn",
            identification: "890123456789",
            delivers: 22
        },
        {
            id: 10,
            name: "Lý Hữu Đạt",
            identification: "901234567890",
            delivers: 25
        },
        {
            id: 11,
            name: "Phạm Văn Thành",
            identification: "112345678901",
            delivers: 23
        },
        {
            id: 12,
            name: "Lê Minh Hiếu",
            identification: "223456789012",
            delivers: 11
        },
    ]
}

const timeline_driver = {
    totalCount: 1,
    results: [{
        id: 1,
        customer_id: "1",
        customer_name: "Nguyễn Văn A",
        departure: "Hải Phòng",
        arrival: "Hà Nội",
        start_date: "2024-11-1",
        end_date: "2024-11-3",
        material: "Vật liệu",
        weight: "10",
        driver_id: 1,
        driver_name: "Nguyễn Văn A",
        truck_id: 1,
        truck_license_plate: "15U1-12233",
        pricing: 1300000,
        tolls: 200000,
        status: 1,
        deliver_status: 2,
        payment_status: 1
    }, {
        id: 2,
        customer_id: "1",
        customer_name: "Nguyễn Văn A",
        departure: "Hải Phòng",
        arrival: "Hà Nội",
        start_date: "2024-11-1",
        end_date: "2024-11-3",
        material: "Vật liệu",
        weight: "10",
        driver_id: 1,
        driver_name: "Nguyễn Văn A",
        truck_id: 1,
        truck_license_plate: "15U1-12233",
        pricing: 1300000,
        tolls: 200000,
        status: 1,
        deliver_status: 1,
        payment_status: 1
    }]
}

const timeline_truck = {
    totalCount: 1,
    results: [{
        id: 1,
        customer_id: "1",
        customer_name: "Nguyễn Văn A",
        departure: "Hải Phòng",
        arrival: "Hà Nội",
        start_date: "2024-11-1",
        end_date: "2024-11-3",
        material: "Vật liệu",
        weight: "10",
        driver_id: 1,
        driver_name: "Nguyễn Văn A",
        truck_id: 1,
        truck_license_plate: "15U1-12233",
        pricing: 1300000,
        tolls: 200000,
        status: 1,
        deliver_status: 2,
        payment_status: 1
    }, {
        id: 2,
        customer_id: "1",
        customer_name: "Nguyễn Văn A",
        departure: "Hải Phòng",
        arrival: "Hà Nội",
        start_date: "2024-11-1",
        end_date: "2024-11-3",
        material: "Vật liệu",
        weight: "10",
        driver_id: 1,
        driver_name: "Nguyễn Văn A",
        truck_id: 1,
        truck_license_plate: "15U1-12233",
        pricing: 1300000,
        tolls: 200000,
        status: 1,
        deliver_status: 1,
        payment_status: 1
    }]
}

export {
    order_data,
    driver_data,
    truck_data,
    user_data,
    dashboard_data,
    revenue_data,
    award_data,
    timeline_driver,
    timeline_truck
}