class Tag {
  constructor(name) {
    this.name = name;
  }

  intoJSX() {
    return <span>{this.name} </span>;
  }
}

class Experience {
  constructor(name, from="00-00-0000", to="00-00-0000") {
    this.name = name;
    this.from = from;
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
      <div>
	<span>{this.name}</span><br/>
      	<span>from: {this.from} </span>
      	<span>to: {this.to}</span>
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
  about: "I am Foo Bar Baz, and I love to code",
  contact: {
    email: "foo.bar.baz@digital.com",
    phone: "+999999999",
  },
  occupation: "Hobbyist programmer",
  education: [
    new Experience("Random school", "00-00-0000", "00-00-0000"),
    new Experience("Michail University", "00-00-0000", "00-00-0000")
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
      <p>{g.about}</p>
      <Experiences name="Education" experiences={g.education}/>
      <Experiences name="Past Jobs" experiences={g.pastJobs}/>
      <div>
	<h3>Languages</h3>
	{g.languages.map(e => <span>{e}<br/></span>)}
      </div>
      <div>
	<h3>Skills</h3>
	{g.skills.map(e => <span>{e}<br/></span>)}
      </div>
      <div>
	<h3>Projects</h3>
	{g.projects.map(e => (
	  <div>
	    <div>{e.name}</div>
	    <a href={e.link}>{e.link}</a>
	  </div>
	))}
      </div>
      <div>
	<h3>contact</h3>
	<a href={g.contact.email}>{g.contact.email}</a><br/>
	<span>{g.contact.phone}</span>
      </div>
    </div>
  );
}

export default CurriculumVitae;
