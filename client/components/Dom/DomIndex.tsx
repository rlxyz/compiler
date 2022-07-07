import { S3 } from '@aws-sdk/client-s3'
import { CollectionLayerFileUpload } from './LIndex/CollectionLayerFileUpload'

const DomIndex = () => {
  return (
    <>
      <div className='max-w-max mx-auto h-[40%]'>
        <main className='w-full h-full'>
          <CollectionLayerFileUpload id={1} />
        </main>
      </div>
    </>
  )
}

export default DomIndex
