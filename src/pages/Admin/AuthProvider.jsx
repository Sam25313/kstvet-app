const authProvider = {
  
  login: async ({ username, password }) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json(); 

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    const { token, role, user, expiresIn } = data;
    const expirationTime = Date.now() + expiresIn * 1000;

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("expiresAt", expirationTime.toString());

    return Promise.resolve();
  },

  // Called when user clicks logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");
    return Promise.resolve();
  },

  // Called on every page load or navigation
  checkAuth: () => {
    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expiresAt");

    if (token && expiresAt && Date.now() < parseInt(expiresAt, 10)) {
      return Promise.resolve(); // Session is valid
    } else {
      // Session expired or token missing
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      localStorage.removeItem("expiresAt");
      return Promise.reject(); 
    }
  },

  // Called when a dataProvider call returns an error
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  
  getPermissions: () => {
    const role = localStorage.getItem("role");
    return Promise.resolve(role);
  },

  
  getIdentity: () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        return Promise.resolve({
          id: user._id || user.username, 
          fullName: user.fullName || user.username,
        });
      }
      return Promise.reject();
    } catch {
      return Promise.reject();
    }
  },
};

export default authProvider;
