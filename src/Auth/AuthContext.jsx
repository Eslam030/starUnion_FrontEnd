// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [authToken, setAuthToken] = useState(null);

//     const login = (token) => {
//         setAuthToken(token);  // Set token in state
//     };

//     const logout = () => {
//         setAuthToken(null);  // Clear the token from state
//     };

//     return (
//         <AuthContext.Provider value={{ authToken, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);
