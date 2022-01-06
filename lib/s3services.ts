import { CfnOutput, Stack } from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';

export class creatS3 {
  private name: string;
  private stack: Stack;

  public constructor(name: string, stack: Stack) {
    this.name = name;
    this.stack = stack;
    this.initialize();
  }

  private initialize() {
    this.createBucket();
  }

  private createBucket() {
    const myBucket = new s3.Bucket(this.stack, this.name, {
      versioned: true,
      bucketName: 'shyju-firstbucket',
    });

    new CfnOutput(this.stack, 'mybuc', {
      value: myBucket.bucketName,
    });
  }
}
