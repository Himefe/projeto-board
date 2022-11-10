import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.css";
import { useSession, signIn, signOut } from "next-auth/react";
import useMatchMedia from "../../../Hooks/useMatchMedia";

const Header = () => {
  const { data: session } = useSession();

  const matchMedia = useMatchMedia("(max-width: 767px)");

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left_area}>
          <div className={styles.image_area}>
            <Image
              width={100}
              height={100}
              className={styles.img_logo}
              alt="Logo board"
              src="/logo-board.svg"
            />
          </div>
          {!matchMedia && (
            <nav className={styles.nav_links}>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/board">Meu board</Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
        {!matchMedia && (
          <div className={styles.right_area}>
            <div className={styles.login_github_area}>
              {session?.user ? (
                <div className={styles.login_github} tabIndex={0}>
                  <div className={styles.user_photo}>
                    <Image
                      width={32.5}
                      height={35.04}
                      alt="Logo Github"
                      src={session.user.image as string}
                      style={{ borderRadius: 50 }}
                    />
                  </div>
                  <span>{session.user.name}</span>
                  <Image
                    width={25}
                    height={25}
                    alt="Botão de sair"
                    src="/x.svg"
                    style={{ marginLeft: 10, cursor: "pointer" }}
                    onClick={() => signOut()}
                  />
                </div>
              ) : (
                <div
                  className={styles.login_github}
                  tabIndex={0}
                  onClick={async () => {
                    const signin = await signIn("github");

                    // setTest(signin);
                    // localStorage.setItem("test", JSON.stringify(signin));
                  }}
                >
                  <Image
                    width={32.5}
                    height={35.04}
                    alt="Logo Github"
                    src="/github-icon.svg"
                  />
                  <span>Entrar com github</span>
                </div>
              )}
            </div>
          </div>
        )}
        {matchMedia && (
          <div className={styles.menu_mobile_area}>
            <nav className={styles.nav_links}>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/board">Meu board</Link>
                </li>
                <li>
                  <div className={styles.login_github_area}>
                    {session?.user ? (
                      <div className={styles.login_github} tabIndex={0}>
                        <Image
                          width={32.5}
                          height={35.04}
                          alt="Logo Github"
                          src={session.user.image as string}
                          style={{ borderRadius: 50 }}
                        />
                        <span style={{ marginLeft: 10 }}>
                          {session.user.name}
                        </span>
                        <Image
                          width={25}
                          height={25}
                          alt="Botão de sair"
                          src="/x.svg"
                          style={{ marginLeft: 10, cursor: "pointer" }}
                          onClick={() => signOut()}
                        />
                      </div>
                    ) : (
                      <div
                        className={styles.login_github}
                        tabIndex={0}
                        onClick={async () => {
                          const signin = await signIn("github");

                          // setTest(signin);
                          // localStorage.setItem("test", JSON.stringify(signin));
                        }}
                      >
                        <Image
                          width={32.5}
                          height={35.04}
                          alt="Logo Github"
                          src="/github-icon.svg"
                        />
                        <span>Entrar com github</span>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
