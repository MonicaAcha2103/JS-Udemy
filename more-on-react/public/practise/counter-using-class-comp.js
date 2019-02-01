class Counter extends React.Component{
    constructor(props){
        super();
        this.addOne= this.addOne.bind(this);
        this.minusOne = this.minusOne.bind(this);
        this.reset= this.reset.bind(this);
        this.state = {
            count:0
        }
    }
     
    componentDidMount(){
      try{
        const data= localStorage.getItem('count');
        const count= parseInt(data,10);
        if(!isNaN(count)){
          this.setState(() => ({
            count
          }));
        }
      }catch(e){
        //Do nothing
      }
    }
    componentDidUpdate(prevProps, prevState){
      if(prevState.count !== this.state.count){
        const count = this.state.count;
        localStorage.setItem('count',count);
      }
    }
    
    
    addOne(){
        this.setState(prevState => {
            return {
                count: prevState.count +1
            };
        });
    }
    minusOne(){
        this.setState((prevState) => {
            return{
                count: prevState.count - 1
            };
        })
    }
    reset(){
        this.setState (() => {
            return{
                count: 0
            }
        })
        // this.setState (() => {
        //     return{
        //         count: this.state.count + 1
        //     }
        // })
        //pitfall since its asynchronous the value is not set to 0 and the updated
        // this.setState((prevState) => {
        //     return{
        //         count: prevState.count - 1
        //     };
        // })
        //if we use an updater function then only renders the DOM
        //it'll batch them into one update.
    }
  
    render() {
        return (
            <div>
                <h1>Count {this.state.count}</h1>
                <button onClick={this.addOne}> +1</button>
                <button onClick={this.minusOne}> -1 </button>
                <button onClick={this.reset}> Reset </button>
  
            </div>
    );
    }
  }
  //   Counter.defaultProps = {
  //     count: 0
  //   }
  
  console.log('App.js is running!');
  
  
  var appRoot = document.getElementById('app');
  
  
  ReactDOM.render(<Counter />, appRoot);
  
  
  