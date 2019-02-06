const User = (props) => {
    return(
      <div>
        <p>{props.name}</p>
      </div>
    );
  
  }
  ReactDOM.render(<User name="Harry"/>, document.getElementById('app'))