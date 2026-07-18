class RoomModel {
  constructor(
    roomId = "",
    roomNumber = "",
    roomType = "",
    category = "",
    price = "",
    capacity = "",
    status = "Available",
    description = "",
    image = "",
     facilities = "",
    hotelPolicy = ""
  ) {
    this.roomId = roomId;
    this.roomNumber = roomNumber;
    this.roomType = roomType;
    this.category = category;
    this.price = price;
    this.capacity = capacity;
    this.status = status;
    this.description = description;
    this.image = image;
     this.facilities = facilities;
    this.hotelPolicy = hotelPolicy;
  }
}

export default RoomModel;