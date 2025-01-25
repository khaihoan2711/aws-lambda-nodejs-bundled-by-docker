import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    const lambda = new cdk.aws_lambda.Function(this, 'MyFunction', {
      runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: cdk.aws_lambda.Code.fromAsset(path.join(__dirname, '../../nodejs-restapi'),{
        bundling:{
          image: cdk.aws_lambda.Runtime.NODEJS_20_X.bundlingImage,
          // network: 'host',
          command: [
            'bash', '-c', [
              'npm install',
              'npm run build',
              'cp -r dist/* /asset-output',
            ].join(' && ')
          ],
        }
      }),
    });
  }
}
