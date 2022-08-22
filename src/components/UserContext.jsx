import React from "react";

export const UserContext = React.createContext(null);

const UserContextProvider = (props) => {
  return (
    <UserContext.Provider
      value={{
        users: [
          {
            name: "Lauren",
            email: "lauren123@gmail.com",
            password: "secret",
            balance: 15000,
          },
          {
            name: "Cam",
            email: "CamABC@yahoo.com",
            password: "password",
            balance: 100000,
          },
        ],
        loggedIn: {
          name: "",
          email: "",
          index: null,
          status: false,
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
