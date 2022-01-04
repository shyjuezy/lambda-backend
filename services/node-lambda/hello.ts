import { aws_sdb } from 'aws-cdk-lib';
// import { v4 } from 'uuid';
import { S3 } from 'aws-sdk';
import * as readline from 'readline';

const s3Client = new S3();

async function handler(event: any, context: any) {
  const buckets = await s3Client.listBuckets().promise();

  const params = {
    Bucket: 'shyju-firstbucket',
    Key: 'testfile.json',
  };

  let data = async function () {
    let records = [{}];
    const stream = s3Client.getObject(params).createReadStream();
    let lineReader = readline.createInterface({ input: stream });

    lineReader
      .on('line', (line) => {
        records.push(line);
      })
      .on('close', () => {
        console.log('Finished processing S3 file.');
        console.log(records);
        return JSON.stringify(records);
      });
  };

  const result = await data();

  console.log('Got An Event:');
  console.log(event);

  return {
    statusCode: 200,
    body: 'Hello From Lambda!' + result,
  };
}

export { handler };
