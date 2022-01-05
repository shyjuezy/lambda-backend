import { rejects } from 'assert';
import { aws_sdb } from 'aws-cdk-lib';
// import { v4 } from 'uuid';
import { S3 } from 'aws-sdk';
import * as readline from 'readline';

const s3Client = new S3();

async function handler(event: any, context: any) {
  const buckets = await s3Client.listBuckets().promise();

  const params = {
    Bucket: 'shyju-firstbucket',
    Key: 'testfile.txt',
  };

  let records: string[] = [];
  const stream = s3Client.getObject(params).createReadStream();
  let lineReader = readline.createInterface({ input: stream });

  const getData = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      lineReader
        .on('line', (line) => {
          records.push(line);
        })
        .on('close', () => {
          console.log('Finished processing S3 file.');
          resolve(records);
        });
    });
  };

  // Call the lamda function here.
  getData()
    .then((data) => {
      data.forEach((el: string) => {
        console.log(el);
      });
      console.log(data);
    })
    .catch((err) => console.log(err));

  console.log('Got An Event:');
  console.log(`event ${event}`);

  return {
    statusCode: 200,
    body: 'Invoked Lambda successfully!',
  };
}

export { handler };
