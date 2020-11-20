import React from 'react'
import Head from 'next/head'
import App from '../src'

const MainPage: React.FC = (props) => {
  return (
    <>
      <Head>
        <title>@prisma-cms/uploader</title>
        <meta
          name="description"
          content="Component boilerplate for prisma-cms"
        />
      </Head>
      <App name="test_file" onUpload={console.warn} {...props} />
    </>
  )
}

export default MainPage
