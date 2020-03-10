class NotebookPage {
	constructor(Title = 'blank', noteDate = Date.now(), Content = 'blank'){
	this.title = Title;
    this.date = noteDate;
    this.content = Content;
	}
  setTitle(Title){
    this.title = Title;
  }
  display(){
    console.log(this.title);
    console.log(this.date);
    console.log(this.content);
  }
}

class Notebook {
  constructor(Name = 'blank'){
    this.name = Name;
    this.pages = [];
  }
  setName(Name){
    this.name = Name;
  }
  addPages(page){this.pages.push(page);}
  showAllPages(){
    console.log(this.name + ' pages')
    this.pages.forEach(function(page){
      page.display()
    });
  }
}

class JournalPage extends NotebookPage {
  constructor(Title = 'Journal Page', noteDate = Date.now(), Content = 'blank', Subtitle = "Here's how my day went"){
    super(Title, noteDate, Content)
    this.subtitle = Subtitle;
  }
  display(){
    super.display();
    console.log(this.subtitle);
  }
}

let page1 = new NotebookPage();
page1.setTitle('Notes');
page2 = new NotebookPage();
page3 = new JournalPage();
let myNotebook = new Notebook('Journal');
myNotebook.addPages(page1);
myNotebook.addPages(page3);
myNotebook.showAllPages();