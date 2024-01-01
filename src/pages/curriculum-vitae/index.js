import "./style.css";

class Tag {
  constructor(name) {
    this.name = name;
  }

  intoJSX() {
    return <span className="Tag">{this.name}</span>;
  }
}

class Experience {
  constructor(name, from="0000-00-00", to="0000-00-00", desc="") {
    this.name = name;
    this.desc = desc;
    this.from = new Date(from);
    this.to = new Date(to);
    this.tags = [];
  }

  addTag(...args) {
    let tag = new Tag(...args);
    this.tags.push(tag);
    return this;
  }

  getStringDate(date) {
    let d = date.getDay();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    if (Number.isNaN(d) || Number.isNaN(m) || Number.isNaN(y)) {
      return "";
    }

    d = "0".repeat((Math.floor(d/10) - 1) * -1) + d.toString();
    m = "0".repeat((Math.floor(m/10) - 1) * -1) + m.toString();

    return `${d}/${m}/${y}`;
  }

  intoJSX() {
    let stringDateFrom = this.getStringDate(this.from);
    let stringDateTo = this.getStringDate(this.to);

    return (
      <div className="Experience">
	<span className="bold-text">{this.name}<br/></span>
	{this.desc !== "" 
	  ? <span className="gray-text">{this.desc}<br/></span>
	  : <></>}
	{stringDateFrom !== ""
	  ? <span className="gray-text">From {stringDateFrom}</span>
	  : <></>}
	<span> </span>
	{stringDateTo !== ""
	  ? <span className="gray-text"> to {stringDateTo}</span>
	  : <></>}
      </div>
    );
  }
}

const Level = {
  Beginner: "begginer",
  Intermediate: "intermediate",
  Skilled: "skilled",
  Fluent: "fluent",
  Native: "native" // This is specific for native language.
}

class Skill {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }

  intoJSX() {
    return (
      <div>
	<span>{this.name}</span> - <span>{this.level}</span>
      </div>
    );
  }
}

class Project {
  constructor(name, link, desc) {
    this.name = name;
    this.link = link;
    this.desc = desc;
  }

  intoJSX() {
    return (
      <div>
	<label>{this.name}</label><br/>
	<a href={this.link}>{this.link}</a><br/>
	<p>{this.desc}</p>
      </div>
    );
  }
}

function Header({resume}) {
  return (
    <div className="Header">
      <div className="Heder.info">
	<h1>{resume.name}</h1>
	<p>{resume.occupation}</p>
      </div>
      <span style={{flex: 1}}></span>
      <div className="Header-contact">
	<span style={{flex: 1}}></span>
	<p>{resume.contact.phone}</p>
	<p>{resume.contact.email}</p>
      </div>
    </div>
  );
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

function Projects({src}) {
  return (
    <div className="Projects">
      {src.map(e => e.intoJSX())}
    </div>
  );
}

const g = {
  name: "Foo Bar Baz",
  about: "Where can I get some? There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  contact: {
    email: "foo.bar.baz@digital.com",
    phone: "+55 (18) 99999-9999",
  },
  occupation: "Hobbyist programmer",
  education: [
    new Experience("Random school", "2014-02-02", "2023-12-13", "High School"),
    new Experience("Michail University", "2024-03-04", "2028-11-29", "Computer Science")
  ],
  pastJobs: [
    new Experience("Good Enterprise", "2025-11-03", "2026-11-02")
      .addTag("clients")
      .addTag("emotional"),
  ],
  skills: [
    new Skill("Python", Level.Intermediate),
    new Skill("C", Level.Fluent),
    new Skill("Rust", Level.Beginner)
  ],
  languages: [
    new Skill("Portuguese Brazilian", Level.Native),
    new Skill("English", Level.Intermediate)
  ],
  projects: [
    new Project("project-a",  "https://www.github.com/user/project-a",  "what this project is about?"),
    new Project("project-b",  "https://www.github.com/user/project-b",  "what this project is about?"),
    new Project("project-c",  "https://www.github.com/user/project-c",  "what this project is about?")
  ]
};

function CurriculumVitae() {
  return (
    <div className="App">
      <Header resume={g}/>
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
	{g.languages.map(e => e.intoJSX())}
      </div>
      <hr/>
      <div>
	<h3>Skills</h3>
	{g.skills.map(e => e.intoJSX())}
      </div>
      <hr/>
      <div>
	<h3>Projects</h3>
	<Projects src={g.projects}/>
      </div>
    </div>
  );
}

export default CurriculumVitae;
