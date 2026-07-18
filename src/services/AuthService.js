class AuthService {

    key = "customerUser";


    // Save Customer Login Data
    async setData(data) {

        localStorage.setItem(
            this.key,
            JSON.stringify(data)
        );

    }



    // Get Customer Data
    async getData() {

        const data = localStorage.getItem(this.key);

        if (data) {

            return JSON.parse(data);

        }

        return null;

    }



    // Remove Customer Data
    async removeData() {

        localStorage.removeItem(this.key);

    }



    // Check Customer Login
    async isLoggedIn() {

        return localStorage.getItem(this.key) !== null;

    }

}


export default new AuthService();