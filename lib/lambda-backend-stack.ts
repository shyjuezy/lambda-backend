import { Stack, StackProps } from 'aws-cdk-lib';
import { aws_apigateway as apigateway } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import * as path from 'path';
import { GenericTable } from './GenericTable';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { S3 } from 'aws-sdk';
import { creatS3 } from './s3services';
// import { aws_lambda as lambda } from 'aws-cdk-lib';
// import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
// import { aws_lambda_nodejs as lambda_nodejs } from 'aws-cdk-lib';

export class LambdaBackendStack extends Stack {
  private api = new apigateway.RestApi(this, 'SampleApi');
  // TODO private sampleTable = new GenericTable('SampleTable', 'sampleID', this);

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // const lambdaFn = new lambda.Function(this, 'helloLambda', {
    //   functionName: 'orig-lambda-hello',
    //   runtime: Runtime.NODEJS_14_X,
    //   handler: 'hello.main',
    //   code: Code.fromAsset(path.join(__dirname, '../services/hello')),
    // });

    new creatS3('MyFirstBucket', this);

    const lambdaNodjsFn = new NodejsFunction(this, 'helloLambdaNodejs', {
      entry: path.join(__dirname, '../services/node-lambda/hello.ts'),
      handler: 'handler',
      functionName: 'node-lambda-hello',
    });

    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions('s3:ListAllMyBuckets');
    s3ListPolicy.addResources('*');
    lambdaNodjsFn.addToRolePolicy(s3ListPolicy);

    //Hello API Lambda Integration
    const helloLambdaIntegration = new LambdaIntegration(lambdaNodjsFn);
    const helloLambdaResource = this.api.root.addResource('test'); // ("hello");
    helloLambdaResource.addMethod('GET', helloLambdaIntegration);
  }
}
