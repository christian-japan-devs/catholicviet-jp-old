import styles from './layout.module.css'
import Link from 'next/link'
import Header from './header'
import Footer from './footer'

const name = 'VietcatholicJp'
export const siteTitle = 'Vietcatholic Jp'

export default function Layout({
    children,
    home
}: {
    children: React.ReactNode
    home?: boolean
}) {
    return (
        <div className={styles.container}>
            <Header/>
            <main>{children}</main>
            { !home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a> Back to home</a>
                    </Link>
                </div>
            )}
            <Footer/>
        </div>
    )
}