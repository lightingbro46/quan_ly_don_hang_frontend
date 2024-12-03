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
    timeline_driver,
    timeline_truck
}