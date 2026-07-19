class OfferModel {

  constructor(
    id,
    offerName,
    offerType,
    discount,
    roomType,
    validFrom,
    validTo,
    description,
    status
  ) {

    this.id = id;
    this.offerName = offerName;
    this.offerType = offerType;
    this.discount = discount;
    this.roomType = roomType;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.description = description;
    this.status = status;

  }

}

export default OfferModel;