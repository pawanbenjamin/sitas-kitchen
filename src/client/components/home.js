import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h3>Welcome to Sita's Kitchen</h3>
      <img
        src={`https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/130526869_10156583190242537_3119612976197845045_n.jpg?_nc_cat=100&ccb=2&_nc_sid=730e14&_nc_ohc=1cqfOsmi6hoAX_Ug-sk&_nc_ht=scontent-iad3-1.xx&oh=4084ddb84ce20fb7043e3a38b0f48a57&oe=5FF6967C`}
        height={300}
        width={200}
      />
      <Link to="/achars">Achars</Link>
    </div>
  );
};

export default Home;
