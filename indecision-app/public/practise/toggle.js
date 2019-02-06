let toggle = false;
const appRoot = document.getElementById('app');

const onButtonToggle = () => {
    toggle = !toggle;
    render();
};

const render = () => {
    const template = (
        <div>
            <h1>Visibilty Toggle</h1>
            <button onClick={onButtonToggle}>{toggle ? 'Hide details':'Show details'}</button>
            {toggle && (<p>Blah blah blah</p>)}
        </div>
        
    );

    ReactDOM.render(template, appRoot);
}




render();




