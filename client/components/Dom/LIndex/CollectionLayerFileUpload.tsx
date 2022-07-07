import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3'

export const s3 = new S3({
  endpoint: process.env.NEXT_PUBLIC_S3_ENDPOINT,
  region: process.env.NEXT_PUBLIC_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_API_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
  },
})

export const CollectionLayerFileUpload = ({ id }: { id: number }) => {
  const uploadCollectionLayerImage = ({
    id,
    layerName,
    fileName,
    buffer,
  }: {
    id: number
    layerName: string
    fileName: string
    buffer: Buffer
  }) => {
    return new Promise((resolve, reject) => {
      const key = `${id}/layers/${layerName}/${fileName}.png`
      s3.send(
        new PutObjectCommand({
          Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
          Key: `${process.env.NEXT_PUBLIC_S3_FOLDER_NAME}/${key}`,
          Body: buffer,
          ContentType: 'image/png',
        }),
        (err) => {
          if (err) {
            reject(err)
          } else {
            console.log(`uploaded ${key}`)
            resolve(key)
          }
        }
      )
    })
  }

  const onDrop = useCallback(async (files) => {
    files.forEach((file) => {
      const reader = new FileReader()
      const pathArray = String(file.path).split('/')
      const layerName = pathArray[1]
      const fileName = pathArray[2].replace('.png', '')
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async () => {
        await uploadCollectionLayerImage({
          id: id,
          fileName: fileName,
          layerName: layerName,
          buffer: Buffer.from(reader.result.toString()),
        })
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
    },
    noClick: true,
    noDrag: false,
  })

  return (
    <div
      className='flex flex-col justify-center items-center p-4 rounded-sm	border-sm border-white bg-white'
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  )
}
