import { useEffect, useState } from "react";
import { getUserBySession } from "../helpers/http";

import { AuthContext } from "./Authenticator";

export {
  AuthContext
}

export default (props: any) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      const res = await getUserBySession();

      setUser(res)
    })()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}