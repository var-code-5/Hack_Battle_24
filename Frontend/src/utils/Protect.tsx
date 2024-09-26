import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
    const [isAuth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            console.log('Checking tokens:', { accessToken, refreshToken });

            if (!accessToken || !refreshToken) {
                setAuth(false);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/auth/validate', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Tokens': JSON.stringify({ accessToken, refreshToken }),
                    },
                });

                if (response.ok) {
                    setAuth(true);
                } else {
                    console.log('Token validation failed:', response.status);
                    setAuth(false);
                }
            } catch (error) {
                console.error('Error during token validation:', error);
                setAuth(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}
