class StaffModel {

  constructor(
    id,
    image,
    name,
    gender,
    phone,
    email,
    address,
    department,
    designation,
    joiningDate,
    salary,
    shift,
    status
  ) {

    this.id = id;
    this.image = image;
    this.name = name;
    this.gender = gender;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.department = department;
    this.designation = designation;
    this.joiningDate = joiningDate;
    this.salary = salary;
    this.shift = shift;
    this.status = status;

  }

}

export default StaffModel;