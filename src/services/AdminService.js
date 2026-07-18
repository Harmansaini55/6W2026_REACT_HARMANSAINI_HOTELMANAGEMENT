
class AdminService {


    // Admin Login
    async login(data) {


        if (
            data.email === "admin@gmail.com" &&
            data.password === "Admin@123"
        ) {


            const adminData = {

                id: "admin001",
                name: "Admin",
                email: data.email,
                userType: 1,
                token: "admin-token",

            };


            localStorage.setItem(
                "adminUser",
                JSON.stringify(adminData)
            );


            return adminData;

        }


        throw new Error("Invalid Admin Email or Password");


    }



    // Get Admin Data
    async getData() {


        const data = localStorage.getItem("adminUser");


        if(data){

            return JSON.parse(data);

        }


        return null;


    }



    // Admin Logout
    async logout() {

       

    localStorage.removeItem("adminUser");
       
   

        return true;


    }



    // Check Admin Login
    async isLoggedIn() {


        return localStorage.getItem("adminUser") !== null;


    }


}


export default new AdminService();