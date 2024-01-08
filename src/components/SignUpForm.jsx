import { useState } from "react";
const url = "https://fsa-jwt-practice.herokuapp.com/signup";

export default function SignUpForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  //   const [valid, setValid] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.length < 8) {
      console.log("Username must be 8 or more characters");
      return;
    }
    try {
      const postdata = { username: username, password: password };
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(postdata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setToken(data.token);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <h2>Sign Up!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            placeholder="Type Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:{" "}
          <input
            type="password"
            placeholder="Type Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button>Submit!</button>
      </form>
    </>
  );
}
