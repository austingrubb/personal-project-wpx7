module.exports = {
    getCustomers: (req, res, next) => {
        const database = req.app.get('db');

        database.get_customers()
            .then(customers => res.status(200).send(customers))
            .catch( err => {
                res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                console.log(err) 
              } );
    },
    getHorses: (req, res, next) => {
        const database = req.app.get('db');
        
        database.get_horses()
            .then(horses => res.status(200).send(horses))
            .catch( err => {
                res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                console.log(err) 
              } );
    },

    createCustomer: (req, res, next) => {
        const database = req.app.get('db');
        const {name, address, zip_code, cell_phone, email, customer_type, appointment_date, appointment_time} = req.body
        console.log(req.body)
        database.create_customer([name, address, zip_code, cell_phone, email, customer_type, appointment_date, appointment_time])
            .then(customer => { console.log(customer) ; res.send(customer)})
            .catch( err => {
                res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
              } );
    },


    createHorse: (req, res, next) => {
        const database = req.app.get('db');
        const {customer_id, name, age, breed, height, sex, foaling_year, color} = req.body

        database.create_horse([customer_id, name, age, breed, height, sex, foaling_year, color])
            .then(() => res.sendStatus(200))
            .catch( err => {
                res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
              } );
    },

    createUser: (req, res) => {
        const database = req.app.get('db');
        const {username, password} = req.body

        database.create_users([username, password])
            .then(() => res.sendStatus(200))
            .catch( err => {
                res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                console.log(err)
              } );
    },

    updateAppDate: (req, res) => {
        const database = req.app.get('db');
        const {id} = req.query
        const {appointment_date, old_appointment} = req.body
        console.log(id, appointment_date, old_appointment);
        database.update_app_date([appointment_date, old_appointment, id])
        .then( () => res.status(200).send('updated date') )
        .catch( err => {
          res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
          console.log(err)
        } )
    },

    updateAppTime: (req ,res) => {
        const database = req.app.get('db'); 
        const {id} = req.query
        const {appointment_time, old_appointment} = req.body
        console.log(id, appointment_time, old_appointment);
        database.update_app_time([appointment_time, old_appointment, id])
        .then( () => res.status(200).send('updated time') )
        .catch( err => {
          res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
          console.log(err)
        } )
    },

    getCustomersAndHorses: (req, res) => {
        const database = req.app.get('db'); 
 
        database.get_customer_and_horse()
        .then( (response) => res.status(200).send(response))
        .catch( err => {
          res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
          console.log(err)
        } )
    },

    delete: (req, res, next) => {
        const database = req.app.get('db');
        const { params } = req;

        database.delete([ params.id ])
          .then( () => res.sendStatus(200) )
          .catch( err => {
            res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
            console.log(err)
          } );
    }


}