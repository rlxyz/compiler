import dynamic from 'next/dynamic'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Suspense } from 'react'
import React from 'react'

const DomUpload = dynamic(() => import('@components/Dom/DomUpload'), {
  ssr: false,
})

const BasicDomLayout = dynamic(() => import('@components/Dom/BasicDomLayout'), {
  ssr: false,
})

const Page = () => {
  return (
    <>
      <Suspense fallback={`loading`}>
        <BasicDomLayout>
          <DomUpload />
        </BasicDomLayout>
      </Suspense>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: ['/compiler/upload/[id]'],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      title: 'Upload',
    },
  }
}

export default Page
