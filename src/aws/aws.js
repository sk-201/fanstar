// require('dotenv').config()
import AWS from 'aws-sdk';
import { nanoid } from 'nanoid';
import fs from 'fs';
const s3 = new AWS.S3({
  accessKeyId: process.env.REACT_APP_AWS_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET,
});
export const uploadImageOnAWS = async (file, buffer) => {
  console.log({
    accessKeyId: process.env.REACT_APP_AWS_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET,
    Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
  });
  try {
    let attachment = file.name.split('.');
    const fileType = attachment[attachment.length - 1];
    // const fileStream = fs.createReadStream(file.path);
    const fileStream = Buffer.from(buffer);
    // console.log(fileStream);
    const params = {
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
      Key: `${nanoid()}.${fileType}`,
      Body: fileStream,
    };
    const data = await s3.upload(params).promise();
    return data.Key;
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong!');
  }
};
export const deleteImage = async (key) => {
  try {
    s3.deleteObject(
      {
        Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
        Key: key,
      },
      function (err, data) {
        console.log(data);
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong!');
  }
};
export const readImage = async (key) => {
  try {
    const downloadParams = {
      Key: key,
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
    };
    const data = await s3.getObject(downloadParams).promise();
    return data.Body;
  } catch (error) {
    //console.log('ERROR IN GETTING IMAGE ', error)
    console.log(error);
    throw new Error('Image not found!');
  }
};

//Bucket policy

// {
//   "Version": "2012-10-17",
//   "Statement": [
//       {
//           "Sid": "AllowPublicReadAccess",
//           "Effect": "Allow",
//           "Principal": "*",
//           "Action": "s3:GetObject",
//           "Resource": "arn:aws:s3:::<bucket_name>/*"
//       }
//   ]
// }

//Bucket cors

// [
//   {
//       "AllowedHeaders": [
//           "*"
//       ],
//       "AllowedMethods": [
//           "GET",
//           "PUT",
//           "POST",
//           "DELETE"
//       ],
//       "AllowedOrigins": [
//           "*"
//       ],
//       "ExposeHeaders": []
//   }
// ]
