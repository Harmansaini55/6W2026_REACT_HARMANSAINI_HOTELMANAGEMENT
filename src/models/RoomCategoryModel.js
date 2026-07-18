class RoomCategoryModel {
  constructor(
    categoryId = "",
    categoryName = "",
    description = "",
    status = "Active"
  ) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
    this.description = description;
    this.status = status;
  }
}

export default RoomCategoryModel;