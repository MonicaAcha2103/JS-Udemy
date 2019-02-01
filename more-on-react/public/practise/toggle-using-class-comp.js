class VisibilityToggle extends React.Component {
    constructor(props){
        super(props);
        this.onButtonToggle= this.onButtonToggle.bind(this);
        this.state = {
            visibility: false
        };
       
    }
    onButtonToggle(){

        this.setState((prevState) => {
            return {
              visibility: !prevState.visibility
            };
          });
        console.log(this.state.visibilty);
    }
    render(){
        return(
           
                <div>
                    <h1>Visibilty Toggle</h1>
                    <button onClick={this.onButtonToggle}>{this.state.visibility ? 'Hide details':'Show details'}</button>
                    {this.state.visibility && (<p>Blah blah blah</p>)}
                </div>

        )}
}


console.log('App.js is running!');


var appRoot = document.getElementById('app');


ReactDOM.render(<VisibilityToggle />, appRoot);
