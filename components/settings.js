import { useContext } from 'react';
import { GlobalContext } from '@/context/GlobalContext';
import { Inter } from 'next/font/google';
import { FaArrowLeft } from "react-icons/fa6";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ['latin'], weight: '400' });

const textAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const staggerSettings = {
    hidden: { opacity: 0, x: -50 },
    visible: (index) => ({
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, delay: index * 0.2 },
    }),
};

export default function Settings() {
    const env = process.env.NODE_ENV;
    const { setActivePage, activePage } = useContext(GlobalContext);

    return (
        <motion.div
            style={inter.style}
            className="bg-[#24272a] w-[400px] h-auto flex flex-col gap-2 rounded-md text-white overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={textAnimation}
        >
            <div className='flex flex-row items-center p-4 shadow-xl text-center w-full'>
                <motion.button onClick={() => setActivePage("index")} whileHover={{ scale: 1.1 }}>
                    <FaArrowLeft />
                </motion.button>
                <motion.h1 className='text-xl font-bold w-full' variants={textAnimation}>
                    Settings
                </motion.h1>
            </div>

            <motion.div className='flex flex-col gap-2'>
                <motion.div
                    className='flex flex-row items-center justify-between p-4'
                    variants={staggerSettings}
                    key="active-page"
                >
                    <span>Active Page</span>
                    <span>{activePage}</span>
                </motion.div>
                <motion.div
                    className='flex flex-row items-center justify-between p-4'
                    variants={staggerSettings}
                    key="disable-something"
                >
                    <span>Disable something</span>
                    <Switch />
                </motion.div>
            </motion.div>
            {env === 'development' && <div>Development Mode</div>}
        </motion.div>
    );
}
