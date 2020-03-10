class Renderer {
  // Write info to DOM
  constructor(data){
    this.root = document.getElementById('root');
    this.div = this._createElement('div');
    this.div.id = 'box';
    this.div.innerHTML = 'Click to change my color'
    this.div.color = 'white';
    this.div.style.height = '100px';
    this.div.style.width = '200px';
    this.div.style.top = '60px';
    this.div.style.position = 'relative';
    this.div.style.margin = 'auto';
    this.div.style.color = 'white';
    this.data = data;
    this.div.style.fontSize = '28px';
    this.div.style.backgroundColor = this.data.box.color;
    this.div.addEventListener('click', () => {
      console.log('click');
      this.data.toggleBox();
      this.render();
    });
    this.render();
  }

  render(){
    this.div.style.backgroundColor = this.data.box.color;
    let parent = document.createElement('div');
    parent.append(this.div);
    if (this.root.firstChild !== null){
      this.root.replaceChild(parent, this.root.firstChild);
      console.log('This should run multiple times.')
    } else {
      this.root.append(parent);
    }
  }

  _createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }
}