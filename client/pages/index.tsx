import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'
import { Suspense } from 'react'
import React from 'react'

const DomIndex = dynamic(() => import('@components/Dom/DomIndex'), {
  ssr: false,
})

const BasicDomLayout = dynamic(() => import('@components/Dom/BasicDomLayout'), {
  ssr: false,
})

const DOM = () => {
  return (
    <Suspense fallback={`loading`}>
      <BasicDomLayout>
        <DomIndex />
      </BasicDomLayout>
    </Suspense>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      {/* @ts-ignore */}
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      title: 'Index',
    },
  }
}

export default Page
