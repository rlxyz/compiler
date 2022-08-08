import dynamic from 'next/dynamic'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Suspense } from 'react'
import React from 'react'

const DomView = dynamic(() => import('@components/Dom/DomView'), {
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
          <DomView />
        </BasicDomLayout>
      </Suspense>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: ['/compiler/view/[id]'],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      title: 'View',
    },
  }
}

export default Page
