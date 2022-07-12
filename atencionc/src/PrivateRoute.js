const PrivateRoute = ({ component: Component, ...props }) => { 
    if (!Component) return null; 
    return props.isAuthenticated ? <Component /> : 
    <Navigate to={"/login"} /> }

    export default PrivateRoute;