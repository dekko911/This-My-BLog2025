import { BrowserRouter, Route, Routes } from "react-router"
import { AboutPage } from "../pages/about"
import { BlogPage } from "../pages/blog"
import { BlogsPage } from "../pages/blogs"
import { HomePage } from "../pages/home"
import { LoginPage } from "../pages/login"
import { Profile } from "../pages/profile"
import { UsersPage } from "../pages/users"

export const RootRoute = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}