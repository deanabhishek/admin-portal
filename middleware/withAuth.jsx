import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  const AuthenticatedPage = (props) => {
    const user = useSelector((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      if (!user.token) {
        router.push("/");
      }
    }, [user.token]);

    return user.token ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedPage;
};

export default withAuth;
