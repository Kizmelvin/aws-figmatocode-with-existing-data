import Head from "next/head";
import clientPromise from "../lib/mongodb";
import { connectToDatabase } from "../utils/mogodb";
import { CardC } from "../ui-components";

export async function getServerSideProps(context) {
  try {
    await clientPromise;

    const { db } = await connectToDatabase();
    const productCollection = await db
      .collection("products")
      .find({})
      .toArray();

    return {
      props: { products: JSON.parse(JSON.stringify(productCollection)) },
    };
  } catch (e) {
    console.error(e);
  }
}

export default function Home({ products }) {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {products.map((product) => (
          <div key={product._id}>
            <CardC
              productName={product.title}
              productImage={product.image}
              productPrice={`$${product.price}`}
              productInfo={product.descrp}
            />
          </div>
        ))}
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          margin: 5rem 0 2rem 0;
          width: 70vw;

          max-width: 1170px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          grid-column-gap: 3rem;
          grid-row-gap: 3rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
