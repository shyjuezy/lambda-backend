#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { LambdaBackendStack } from "../lib/lambda-backend-stack";

const app = new cdk.App();
new LambdaBackendStack(app, "Lambda-BackendStack", {
  stackName: "BackendStack",
});
