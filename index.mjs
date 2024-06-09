// Load the AWS SDK
import AWS from 'aws-sdk';

// Create the DynamoDB service object
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const handler = async (params) => {
  let result =Math.pow(params?.base,params.exponent)
  // TODO implement
    const DataBaseInsertStr = {
    TableName: 'powerOfMath', // Replace with your DynamoDB table name
    Item: {
      id: result.toString(), // Ensure the id is unique and received from the event object
      localTime:new Date()
      // Add any other attributes you want to insert
    },
  };
  
  try {
    // Insert the item into the DynamoDB table
    await dynamoDb.put(DataBaseInsertStr).promise();
    return { statusCode: 200, body: {message:'Item successfully inserted',result:result} };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: {message:'Failed To insert',result:''} };
  }
  
};
