import { Stack, StackProps } from "aws-cdk-lib";
import { aws_lambda as lambda } from "aws-cdk-lib";
import { aws_apigateway as apigateway } from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Code, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as path from "path";
import { GenericTable } from "./GenericTable";

export class LambdaBackendStack extends Stack {
  private api = new apigateway.RestApi(this, "SampleApi");
  private spacesTable = new GenericTable("SampleTable", "sampleID", this);

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaFn = new lambda.Function(this, "helloLambda", {
      runtime: Runtime.NODEJS_14_X,
      handler: "hello.main",
      code: Code.fromAsset(path.join(__dirname, "../services/hello")),
    });

    //Hello API Lambda Integration
    const helloLambdaIntegration = new LambdaIntegration(lambdaFn);
    const helloLambdaResource = this.api.root.addResource("test"); // ("hello");
    helloLambdaResource.addMethod("GET", helloLambdaIntegration);
  }
}
