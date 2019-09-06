
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
   mongoConnection = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
      process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
      process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
      process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
      process.env.OPENSHIFT_APP_NAME;
} else {
   mongoConnection = "mongodb://127.0.0.1/mydb";
}

module.exports = {

   // the database url to connect
   url : mongoConnection

}
