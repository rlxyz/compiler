import Head from 'next/head'
import * as React from 'react'
import dynamic from 'next/dynamic'
import LDom from '@components/LDom'
import useStore from '@hooks/useStore'
import { useRouter } from 'next/router'
import { NAMINGS } from '@utils/constant'
import useUserInteractions from '@hooks/useUserInteractions'
import { useLoadingProgress } from '../hooks/useLoadingProgress'

const ForwardPropsToR3fComponent = ({ comp, pageProps }) => {
  let r3fArr = []
  let compArr = []

  try {
    React.Children.forEach(comp(pageProps).props.children, (child) => {
      if (child?.props && child.props.r3f) {
        r3fArr.push(child)
      } else {
        compArr.push(child)
      }
    })
    return <>{compArr.length > 0 && <LDom>{compArr}</LDom>}</>
  } catch (error) {
    // @ts-ignore
    return <comp {...pageProps} />
  }
}

type LayoutProps = {
  children: React.ReactNode
  pageProps: any
}

const LLayout = ({ children, pageProps = { title: 'Index' } }: LayoutProps) => {
  const router = useRouter()
  const userInteractions = useUserInteractions()
  const progress = useLoadingProgress()

  React.useEffect(() => {
    useStore.setState({ router, userInteractions, progress })
  }, [
    userInteractions.isDropdownOpen,
    userInteractions.scrollRef,
    userInteractions.scrollProgress,
    userInteractions.onScroll,
  ])

  return (
    <>
      <Head>
        {/* Recommended meta tags */}
        <meta charSet='utf-8' />
        <meta name='language' content='english' />
        <meta httpEquiv='content-type' content='text/html' />
        <meta name='author' content={'RLXYZ'} />
        <meta name='designer' content={NAMINGS.author.RLXYZ} />
        <meta name='publisher' content={NAMINGS.author.RLXYZ} />

        {/* Search Engine Optimization Meta Tags */}
        <title>
          {NAMINGS.title} - {pageProps.title}
        </title>
        <meta name='description' content={NAMINGS.description} />
        <meta name='keywords' content={`${NAMINGS.keywords}`} />
        <meta name='robots' content='index,follow' />
        <meta name='distribution' content='web' />

        {/* Facebook Open Graph meta tags */}
        <meta name='og:title' content={NAMINGS.title} />
        <meta name='og:description' content={NAMINGS.description} />
        <meta name='og:type' content='site' />
        <meta
          name='og:image'
          content='https://rlxyz.nyc3.cdn.digitaloceanspaces.com/dreamlab/reflections/landing-client/opengraph-image.png'
        />
        {/* <meta name='og:url' content='https://compiler.rlxyz.com' /> */}
        <meta name='og:author' content={NAMINGS.author.RLXYZ} />
        <meta name='og:site_name' content={NAMINGS.title} />

        {/* Twitter Card meta tags */}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:site' content='@studiobyrlxyz' />
        <meta name='twitter:title' content='Studio by RLXYZ' />
        <meta name='twitter:description' content={NAMINGS.description} />
        <meta
          name='twitter:image'
          content='https://rlxyz.nyc3.cdn.digitaloceanspaces.com/dreamlab/reflections/landing-client/twitter-image.png'
        />

        <meta
          name='viewport'
          content='width=device-width, minimum-scale=1, initial-scale=1.0'
        />
        <meta name='theme-color' content='#000' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <main className='h-full w-full bg-hue-light'>
        {/* <hr className='absolute h-px w-full top-1/2 transform -translate-y-1/2  border-0 bg-white z-[5000]' /> */}
        {/* <hr className='absolute h-full w-px left-1/2 transform -translate-x-1/2 border-0 bg-white z-[5000]' /> */}
        <ForwardPropsToR3fComponent comp={children} pageProps={pageProps} />
      </main>
    </>
  )
}

export default LLayout
