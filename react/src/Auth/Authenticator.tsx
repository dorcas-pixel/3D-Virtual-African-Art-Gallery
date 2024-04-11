import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, createContext } from "react";
import { getUserBySession, getUserByUsername } from "../helpers/http";
import NotFound from "../Account/NotFound";

export const AuthContext: React.Context<any> = createContext(null);

export default (props: any) => {
  const nav = useNavigate();
  const [user, setUser] = useState(null)
  const [isRealUser, setIsRealUser] = useState('pending');
  const { username } = useParams();

  useEffect(() => {
    (async () => {
      const res = await getUserBySession();

      const userWithUsername = await getUserByUsername(username);

      setUser(res)

      if (!res) return nav('/sign-in')

      else if (props.sameUser && res && res.username != username) return nav(location.pathname.replace(username as string, res.username))

      setIsRealUser(
        !userWithUsername ? 'false' : 'true'
      )
    })()
  }, [])

  return isRealUser == 'false' ? <NotFound/> : (
    <AuthContext.Provider value={{ user, setUser }}>
      {user && props.children}
    </AuthContext.Provider>
  )
}