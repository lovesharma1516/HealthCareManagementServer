import Google from "../img/google.png";
// import Facebook from "../img/facebook.png";
// import Github from "../img/github.png";

const Login = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  // const github = () => {
  //   window.open("http://localhost:5000/auth/github", "_self");
  // };

  // const facebook = () => {
  //   window.open("http://localhost:5000/auth/facebook", "_self");
  // };

  return (
    <div className="login">
      <h1 className="loginTitle">Select a Login Method!</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">Login with Social Platforms</div>
        </div>
        <div className="right">
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <button className="submit">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
