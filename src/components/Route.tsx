import { motion } from 'framer-motion'
import Head from 'next/head'
import { FC } from 'react'

interface RouteProps {
    title?: string | null;
    description?: string | null;
}

export const Route: FC<RouteProps> = ({ children, description, title }) => {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
            <Head>
                <title> {title || "Kurdziel\'s Shop"} </title>
                <meta name="description" content={description || "Test store to learn e-commerce with nextjs"} />
            </Head>

            {children}

        </motion.div>
    )
}
