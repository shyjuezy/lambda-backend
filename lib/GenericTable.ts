import { Stack } from 'aws-cdk-lib';
import { aws_dynamodb as dynamodb } from 'aws-cdk-lib';

export class GenericTable {
  private name: string;
  private primaryKey: string;
  private stack: Stack;
  private table: dynamodb.Table;

  public constructor(name: string, primaryKey: string, stack: Stack) {
    this.name = name;
    this.primaryKey = primaryKey;
    this.stack = stack;
    this.initialize();
  }

  private initialize() {
    this.createTable();
  }

  private createTable() {
    this.table = new dynamodb.Table(this.stack, this.name, {
      partitionKey: {
        name: this.primaryKey,
        type: dynamodb.AttributeType.STRING,
      },
      tableName: this.name,
    });
  }
}
