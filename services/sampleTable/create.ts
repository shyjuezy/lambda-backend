import { DynamoDB } from 'aws-sdk';
import { PromptId } from 'aws-sdk/clients/connect';

const dbClient = new DynamoDB.DocumentClient();

const sampleDataAdd = async (value: string): Promise<string> => {
  const item = {
    sampleID: value,
  };

  try {
    await dbClient
      .put({
        TableName: 'SampleTable',
        Item: item,
      })
      .promise();
  } catch (err) {
    console.log('Error');
  }

  return 'test';
};

export { sampleDataAdd };
