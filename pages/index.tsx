/* eslint-disable @next/next/no-img-element */
import { Route } from "components";
import { RightArrow } from "icons";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

const Home = () => {
    return (
        <Route>
            <div className='mt-12'>
                <div className=' md:max-w-md xl:max-w-xl z-40'>
                    <h1 className=' text-2xl md:text-6xl font-serif'>
                        The easiest way to upgrade to the latest smartphone.
                    </h1>
                    <p className='text-gray-700 text-xl mt-9'>
                        If you’re a current member of the iPhone Upgrade Program and enter
                        the Social Security number you used when you first joined the
                        program.
                    </p>
                    <Link href='/products'>
                        <a>
                            <button className='w-52 bg-gradient-to-bl rounded-lg tracking-wider from-green-500 to-green-800 text-yellow-50 text-base md:text-xl px-4 py-3 mt-11 uppercase '>
                                Explore <RightArrow />
                            </button>
                        </a>
                    </Link>
                </div>
                <img
                    className='absolute max-w-md bottom-36 hidden md:block right-8 md:right-20 xl:right-36 '
                    src='/images/phone-in-hand-42.png'
                    alt='phone'
                />
            </div>
        </Route>
    );
};


export default Home;
