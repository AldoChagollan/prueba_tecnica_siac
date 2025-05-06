"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('TOKEN_APP');
    
    if (!token) return router.push('/login');

    /* aqui se podria decodificar y validar datos o si ya expiró */

    setAuthenticated(true);
  }, [router]);

  return authenticated;
};

export default useAuth;
