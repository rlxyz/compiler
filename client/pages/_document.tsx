import Document, { Html, Head, Main, NextScript } from 'next/document'

class ReflectionsDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='stylesheet' type='text/css' href='/font.css' />
          <link
            rel='reload'
            href='https://rlxyz.nyc3.cdn.digitaloceanspaces.com'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default ReflectionsDocument
