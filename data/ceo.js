import Head from "next/head"

const ceo = page => {
  return (
    <div>
        <Head>
            <title>Librería Imagina - {page} </title>
            <meta name="description" content="Integración Librería Imagina por TESS" />
            <link rel="icon" href="/img/zyro-image.png" />
        </Head>
    </div>
  )
}

export default ceo;