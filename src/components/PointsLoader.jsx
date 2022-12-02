function PointsLoader({loadingW}) {
    var mystyle = {};
   
      mystyle = {
        backgroundColor: "#002b5c"
      };
 
  
    return (
      <div className={`text-center w-full `}>
        <div className="ldds-ellipsis text-dbasenavy ">
          <div style={mystyle}></div>
          <div style={mystyle}></div>
          <div style={mystyle}></div>
          <div style={mystyle}></div>
        </div>
      </div>
    );
  }
  
  export default PointsLoader;
  