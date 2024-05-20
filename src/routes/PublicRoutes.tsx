import { Navigate } from "react-router-dom";

type PublicRoutesProps = {
  children: React.ReactNode;
  isAuthenticated: boolean;
};

const PublicRoutes: React.FC<PublicRoutesProps> = ({
  children,
  isAuthenticated,
}) => {
  return !isAuthenticated ? children : <Navigate to="/" />;
};

export default PublicRoutes;
