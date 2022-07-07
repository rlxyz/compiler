import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useStore from '@hooks/useStore'
import LLayout from '@components/LLayout'

function Reflections({ Component, pageProps = { title: 'index' } }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  return <LLayout pageProps={pageProps}>{Component}</LLayout>
}

export default Reflections
