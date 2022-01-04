import { Stack, StackProps } from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { aws_apigateway as apigateway } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as path from 'path';
import { GenericTable } from './GenericTable';
import { aws_lambda_nodejs as lambda_nodejs } from 'aws-cdk-lib';

export class LambdaBackendStack extends Stack {
  private api = new apigateway.RestApi(this, 'SampleApi');
  private spacesTable = new GenericTable('SampleTable', 'sampleID', this);

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFn = new lambda.Function(this, 'helloLambda', {
      functionName: 'orig-lambda-hello',
      runtime: Runtime.NODEJS_14_X,
      handler: 'hello.main',
      code: Code.fromAsset(path.join(__dirname, '../services/hello')),
    });

    const lambdaNodjsFn = new lambda_nodejs.NodejsFunction(
      this,
      'helloLambdaNodejs',
      {
        entry: path.join(__dirname, '../services/node-lambda/hello.ts'),
        handler: 'handler',
        functionName: 'node-lambda-hello',
      }
    );

    //Hello API Lambda Integration
    const helloLambdaIntegration = new LambdaIntegration(lambdaFn);
    const helloLambdaResource = this.api.root.addResource('test'); // ("hello");
    helloLambdaResource.addMethod('GET', helloLambdaIntegration);
  }
}
