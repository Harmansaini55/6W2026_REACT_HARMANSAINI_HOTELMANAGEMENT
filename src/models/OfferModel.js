class OfferModel {

  constructor(
    id,
    offerName,
    offerType,
    discount,
    validFrom,
    validTo,
    description,
    status
  ) {

    this.id = id;
    this.offerName = offerName;
    this.offerType = offerType;
    this.discount = discount;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.description = description;
    this.status = status;

  }

}

export default OfferModel;