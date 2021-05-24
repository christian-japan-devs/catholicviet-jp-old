import Link from "next/link"
import Head from 'next/head'
import { signIn, signOut, useSession } from "lib/client"
import styles from "./header.module.css"


export const siteTitle = 'Vietcatholic Jp'

export default function Header() {
    const { session, loading } = useSession()
    const name = 'VietcatholicJp'
    console.log(session)
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header>
                <noscript>
                    <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
                </noscript>
                <div className={styles.signedInStatus}>
                    <p className={`nojs-show ${!session && loading ? styles.loading : styles.loaded}`}>
                        {!session && (
                            <>
                                <span className={styles.notSignedInText}>
                                    You are not signed in
                            </span>
                                <a
                                    href={`/api/auth/signin`}
                                    className={styles.buttonPrimary}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        signIn("aa", "aa")
                                    }}
                                >
                                    Sign in
                            </a>
                            </>
                        )}
                        {session?.user && (
                            <>
                                <span
                                    style={{ backgroundImage: `url(${session.user.image})` }}
                                    className={styles.avatar}
                                />
                                <span className={styles.signedInText}>
                                    <small>Signed in as</small>
                                    <br />
                                    <strong>{session.user.email || session.user.name}</strong>
                                </span>
                                <a
                                    href={`/api/auth/signout`}
                                    className={styles.button}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        signOut()
                                    }}
                                >
                                    Sign out
                            </a>
                            </>
                        )}
                    </p>
                </div>
                <nav>
                    <ul className={styles.navItems}>
                        <li className={styles.navItem}>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/client">
                                <a>Client</a>
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/server">
                                <a>Server</a>
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/protected">
                                <a>Protected</a>
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/api-example">
                                <a>API</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}