import Head from "next/head"

const ceo = page => {
  return (
    <>
        <Head>
            <title>Librería Imagina - {page}</title>
            <meta name="description" content="Integración Librería Imagina por TESS" />
        </Head>
    </>
  )
}

export default ceo