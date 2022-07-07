import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3,
} from '@aws-sdk/client-s3'

export const s3 = new S3({
  endpoint: process.env.NEXT_PUBLIC_S3_ENDPOINT,
  region: process.env.NEXT_PUBLIC_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_API_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
  },
})

export const CollectionLayerDisplayAll = ({ id }: { id: number }) => {
  const listCollectionLayerFolder = ({
    id,
    commitHash,
  }: {
    id: number
    commitHash: string
  }) => {
    return new Promise((resolve, reject) => {
      const key = `${id}/blob/${commitHash}/layers`
      s3.send(
        new ListObjectsV2Command({
          Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
          Delimiter: '',
          Prefix: `${process.env.NEXT_PUBLIC_S3_FOLDER_NAME}/${key}`,
        }),
        (err) => {
          if (err) {
            reject(err)
          } else {
            console.log(`list ${key}`)
            resolve(key)
          }
        }
      )
    })
  }

  const listOneCollectionLayerImage = ({
    id,
    commitHash,
    fileName,
  }: {
    id: number
    commitHash: string
    fileName: string
  }) => {
    return new Promise((resolve, reject) => {
      const key = `${id}/blob/${commitHash}/layers/${fileName}.png`
      s3.send(
        new HeadObjectCommand({
          Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
          Key: `${process.env.NEXT_PUBLIC_S3_FOLDER_NAME}/${key}`,
        }),
        (err) => {
          if (err) {
            reject(err)
          } else {
            console.log(`get ${key}`)
            resolve(key)
          }
        }
      )
    })
  }

  return (
    <div className='flex flex-col justify-center items-center p-4 rounded-sm	border-sm border-white bg-white'></div>
  )
}
