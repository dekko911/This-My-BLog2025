import { BrowserRouter, Route, Routes } from "react-router";

import { AboutPage } from "../pages/about";

import { BlogPage } from "../pages/blog";
import { BlogsPage } from "../pages/blogs";
import { CreateBlogsPage } from "../pages/blogs/create";

import { CategoryPage } from "../pages/categories";
import { CreateCategoryPage } from "../pages/categories/create";

import { HomePage } from "../pages/home";

import { LoginPage } from "../pages/login";

import { Profile } from "../pages/profile";

import { UsersPage } from "../pages/users";
import { CreateUserPage } from "../pages/users/create";

export const RootRoute = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/blog" element={<BlogPage />} />
				<Route path="/blogs" element={<BlogsPage />} />
				<Route path="/blogs/create" element={<CreateBlogsPage />} />
				<Route path="/categories" element={<CategoryPage />} />
				<Route path="/categories/create" element={<CreateCategoryPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/users" element={<UsersPage />} />
				<Route path="/users/create" element={<CreateUserPage />} />
			</Routes>
		</BrowserRouter>
	);
};
