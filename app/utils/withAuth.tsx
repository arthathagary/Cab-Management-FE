import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login"); // Redirect immediately
      } else {
        setIsAuthorized(true);
      }

      setIsLoading(false);
    }, []);

    if (isLoading) return null; // Prevents flashing
    if (!isAuthorized) return null; // Don't show content before redirect

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
