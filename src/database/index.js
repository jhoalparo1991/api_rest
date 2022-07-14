const { connect } = require('mongoose');


(async()=>{
    try {
        const result = await connect(process.env.MONGO_URI)
        console.log(`Database ${result.connections[0].name} is connected` );
    } catch (error) {
       console.log(error.message);
    }
})()