import { createContext, useContext, useState } from "react";

type NavbarContextType = {
  username: string;
  setUsername: (username: string) => void;
  profile_pic: string;
  setProfilePic: (profile_pic: string) => void;
};

const NavbarContext = createContext<NavbarContextType>({
  username: "",
  setUsername: () => {},
  profile_pic: "",
  setProfilePic: () => {},
});

export const useUser = () => useContext(NavbarContext);

interface Props {
  children: React.ReactNode;
}

export const NavbarProvider = ({ children }: Props) => {
  const [username, setUsername] = useState("");
  const [profile_pic, setProfilePic] = useState("");

  return (
    <NavbarContext.Provider
      value={{
        username,
        setUsername,
        profile_pic,
        setProfilePic,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
