/*

(1) Database
    * Create database with appropriate tables (create file)
      * Insert Products (seed file)

(1) Customer
    * Node App (`bamazonCustomer.js`) that:
      * Displays itemd for sale
      * Lets the user buy them
      * Updates the database

(2) Manager
    * Seperate Node Application (`bamazonManager.js`)
        * View Products for Sale
        * View Low Inventory
        * Add to Inventory
        * Add New Product

(3) Departments
    * New Table with:
        * department_id
        * department_name
        * over_head_costs (A dummy number you set for each department)
    * modify your `bamazonCustomer.js` app so that when a customer purchases 
      anything from the store, the price of the product multiplied by the quantity purchased 
      is added to the product's product_sales column.
    * Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:
        * View Product Sales by Department
        * Create New Department

    ...and go back, there is still more requirements
*/