import { Navigate } from "react-router-dom";

type PrivateRoutesProps = {
  children: React.ReactNode;
  isAuthenticated: boolean;
};

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({
  children,
  isAuthenticated,
}) => {
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoutes;
