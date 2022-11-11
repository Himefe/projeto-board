import type { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { api_user } from "../libs/api/user";
import styles from "../styles/Home.module.css";
import { UserParam } from "../Types/User/user";
import { authOptions } from "./api/auth/[...nextauth]";

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Um projeto board criado do zero a partir de um protótipo do Figma"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.undraw_area}>
          <Image
            src="/undraw_accept_tasks_po1c 1.svg"
            alt="Undraw picture"
            width={553}
            height={384}
          />
        </div>
        <div className={styles.texts_area}>
          <div className={styles.description}>
            <h1>
              Uma ferramenta para seu dia a dia Escreva, planeje e organize-se..
            </h1>
            <p>
              <span className={styles.span_text_area}>100% Gratuita</span> e
              online
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
