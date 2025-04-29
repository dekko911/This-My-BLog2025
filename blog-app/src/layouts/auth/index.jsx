import { Link, useLocation } from "react-router"
import { Footer } from "../../components/footer"
import { Header } from "../../components/header"

export const AuthLayout = ({ children }) => {
    const location = useLocation();

    return (
        <div className="bg-linear-90 from-zinc-600 to-zinc-400">
            <Header>
                <Link to="/users" className={`hover:text-pink-500 hover:-mt-1 duration-200 ${location.pathname === "/users" ? "text-white" : null}`}>Users</Link>
                <Link to="/blogs" className={`hover:text-pink-500 hover:-mt-1 duration-200 ${location.pathname === "/blogs" ? "text-white" : null}`}>Blogs</Link>
                <Link to="/profile" className={`hover:text-pink-500 hover:-mt-1 duration-200 ${location.pathname === "/profile" ? "text-white" : null}`}>Profile</Link>
            </Header>

            <div className="text-zinc-50">
                {children}
            </div>

            <Footer />
        </div>
    )
}