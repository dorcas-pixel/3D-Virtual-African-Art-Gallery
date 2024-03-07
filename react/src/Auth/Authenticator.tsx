import { useNavigate } from "react-router-dom"
import { useEffect, useState, createContext } from "react";
import { getUserBySession } from "../helpers/http";

export const AuthContext: React.Context<any> = createContext(null);

export default (props: any) => {
  const nav = useNavigate();
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      const res = await getUserBySession();

      setUser(res)

      if (!res) nav('/sign-in')
    })()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user && props.children}
    </AuthContext.Provider>
  )
}