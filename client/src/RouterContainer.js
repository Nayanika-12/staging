import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Loginpage from './pages/Loginpage/Loginpage';
import Signup from './pages/Signup/Signup';
function RouterContainer() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <App />
		},
		{
			path: '/login',
			element: <Loginpage />
		},
		{
			path: '/signup',
			element: <Signup />
		}
	]);

	return <RouterProvider router={router} />;
}

export default RouterContainer;
