
import {
  Card,
  Container,
  Grid,
  Spacer,
  Text,
} from "@nextui-org/react";
import Head from "next/head";
import Product from "../components/ProductCard";


export const getServerSideProps = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=8");
    const { products } = await res.json();
    return {
      props: { products },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { products: [] },
    };
  }
};

export default function Home({ products }) {
  return (
    <>
      <Head>
        <title>Shopping app</title>
      </Head>
      <main>
        <header className="store-hero">
          <Spacer y={2} />
          <Container md>
            <Card variant="bordered">
              <Card.Body css={{ padding: "$24" }}>
                <Text h1 css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%" }}>
                  Welcome to the CCTECH Shopping App!
                </Text>
                <Text size={24}>
                  This Shopping app is built with Next UI and Next.js.
                  This project showcases Next UI components.
                </Text>
              </Card.Body>
            </Card>
          </Container>
        </header>
        <Container lg>
          <Grid.Container gap={2}>
            {products.map((product) => (
              <Grid xs={12} sm={3} md={2.4} key={product.id}>
                <Product product={product} />
              </Grid>
            ))}
          </Grid.Container>
        </Container>
      </main>
    </>
  );
}