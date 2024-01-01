import "./style.css";

class Tag {
  constructor(name) {
    this.name = name;
  }

  intoJSX() {
    return <span>{this.name} </span>;
  }
}

class Experience {
  constructor(name, from="00-00-0000", to="00-00-0000", desc="") {
    this.name = name;
    this.from = from;
    this.desc = desc;
    this.to = to;
    this.tags = [];
  }

  addTag(...args) {
    let tag = new Tag(...args);
    this.tags.push(tag);
    return this;
  }

  intoJSX() {
    return (
      <div className="Experience">
	<span>{this.name}</span><br/>
	<span>{this.desc}</span><br/>
      	<span>from {this.from} to {this.to}</span>
      </div>
    );
  }
}

function Experiences({name, experiences}) {
  experiences = experiences || [];
  return (
    <div>
      <h3>{name}</h3>
      {experiences.map(e => e.intoJSX())}
      {experiences.map(e => e.tags.map(t => t.intoJSX()))}
    </div>
  );
}

const g = {
  name: "Foo Bar Baz",
  about: "Where can I get some? There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  contact: {
    email: "foo.bar.baz@digital.com",
    phone: "+999999999",
  },
  occupation: "Hobbyist programmer",
  education: [
    new Experience("Random school", "00-00-0000", "00-00-0000", "High School"),
    new Experience("Michail University", "00-00-0000", "00-00-0000", "Computer Science")
  ],
  pastJobs: [
    new Experience("Good Enterprise")
      .addTag("clients")
      .addTag("emotional"),
  ],
  skills: [
    "Python",
    "C",
    "Rust"
  ],
  languages: ["Portuguese Brazilian", "English"],
  projects: [
    {
      name: "project-a",
      link: "https://www.github.com/user/project-a",
      description: "what this project is about?",
    },
    {
      name: "project-b",
      link: "https://www.github.com/user/project-b",
      description: "what this project is about?",
    },
    {
      name: "project-c",
      link: "https://www.github.com/user/project-c",
      description: "what this project is about?",
    },
  ]
};

function CurriculumVitae() {
  return (
    <div className="App">
      <div>
	<h1>{g.name}</h1>
	<p>{g.occupation}</p>
      </div>
      <hr/>
      <h3>about</h3>
      <p>{g.about}</p>
      <hr/>
      <Experiences name="Education" experiences={g.education}/>
      <hr/>
      <Experiences name="Past Jobs" experiences={g.pastJobs}/>
      <hr/>
      <div>
	<h3>Languages</h3>
	{g.languages.map(e => <span>{e}<br/></span>)}
      </div>
      <hr/>
      <div>
	<h3>Skills</h3>
	{g.skills.map(e => <span>{e}<br/></span>)}
      </div>
      <hr/>
      <div>
	<h3>Projects</h3>
	{g.projects.map(e => (
	  <div>
	    <div>{e.name}</div>
	    <a href={e.link}>{e.link}</a>
	  </div>
	))}
      </div>
      <hr/>
      <div>
	<h3>contact</h3>
	<a href={g.contact.email}>{g.contact.email}</a><br/>
	<span>{g.contact.phone}</span>
      </div>
    </div>
  );
}

export default CurriculumVitae;
