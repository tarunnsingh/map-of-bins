export default {
  login: async (user) => {
    const res = await fetch("api/user/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status !== 401) return res.json().then((data) => data);
    else
      return {
        isAuthenticated: false,
        user: { email: "", name: "" },
        message: { msgBody: "Invalid Credentials", msgError: true },
      };
  },
  register: async (user) => {
    const res = await fetch("api/user/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },
  logout: async () => {
    const res = await fetch("api/user/logout");
    const data = await res.json();
    return data;
  },
  isAuthenticated: async () => {
    const res = await fetch("api/user/authenticated");
    if (res.status !== 401) return res.json().then((data) => data);
    else return { isAuthenticated: false, user: { email: "", name: "" } };
  },
};
