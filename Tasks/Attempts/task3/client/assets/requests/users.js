const updateUser = (userData, userId, token) => {
    const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      });
    
      const requestOptions = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(userData),
      };
      return fetch(
        `http://localhost:3000/api/users/${userId}`,
        requestOptions
      );
  };

  export default { updateUser };