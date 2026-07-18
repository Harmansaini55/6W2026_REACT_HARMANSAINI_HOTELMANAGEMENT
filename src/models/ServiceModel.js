class ServiceModel {

  constructor(
    id,
    serviceName,
    category,
    price,
    description,
    status
  ) {
    this.id = id;
    this.serviceName = serviceName;
    this.category = category;
    this.price = price;
    this.description = description;
    this.status = status;
  }

}

export default ServiceModel;