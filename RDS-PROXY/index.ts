import * as AWS from 'aws-sdk';
import {Context} from 'aws-lambda';
AWS.config.update({region: 'us-east-1});
import * as Knex from 'knex'

  
const host= 'database-1.cssf3sbrugta.us-east-1.rds.amazonaws.com';
const user='admin';
const password='demopass';
const database=' ';

cosnt connection ={
ssl: { rejectUnauthorized: false},
host,
user,
password,
database,
};
const knex=Knex({client: 'mysql',connection,});
let count=0;

//create connection;
export const handler=async function(event: any,context: Context)
try
{
count++;
//use connection for queries
await knex('vals').insert({key: `execution #${count}`, val: new Date(),
const res=await knex('vals').select();
console.log(res);
                           
});

  
catch(err)
{
  console.error(err);
}
};
