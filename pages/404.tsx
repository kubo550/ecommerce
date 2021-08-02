import Image from "next/image"
import Link from "next/link"
import { Route } from "components";

const NotFound = () => {
    return (
        <Route title="Page Not Found">
            <div className="max-w-xl mx-auto flex flex-col items-center justify-center">
                <Image src="/images/404.svg" alt="Not Found" width={400} height={400} />
                <h1 className="text-2xl font-semibold text-center my-3">Page Not Found.</h1>
                <p className="text-gray-500 mt-2"> The page you are looking for does not exist </p>
                <Link href="/" passHref>
                    <button className="uppercase text-bold flex items-center my-6">Go to home < RightArrow /> </button>
                </Link>
            </div>
        </Route>
    );
}

const RightArrow = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
</svg>

export default NotFound;