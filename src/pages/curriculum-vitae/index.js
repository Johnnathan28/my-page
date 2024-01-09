import "./style.css";
import cv from "../../assets/cv";
import perfilImage from "../../assets/me.jpg";

class Tag {
  constructor(name) {
    this.name = name;
  }

  intoJSX(key=null) {
    return <span key={key} className="Tag">{this.name}</span>;
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

  intoJSX(key=null) {
    let stringDateFrom = this.getStringDate(this.from);
    let stringDateTo = this.getStringDate(this.to);

    return (
      <div key={key} className="Experience">
	<span className="bold-text">{this.name}<br/></span>
	{this.desc !== "" &&
	  <span className="gray-text">{this.desc}<br/></span>}
	{stringDateFrom !== "" &&
	  <span className="gray-text">From {stringDateFrom}</span>}
	<span> </span>
	{stringDateTo !== "" &&
	  <span className="gray-text"> to {stringDateTo}</span>}
	{this.tags.length > 0 &&
	  <div style={{marginTop: "5px"}}>{this.tags.map((t, i) => t.intoJSX(i))}</div>}
      </div>
    );
  }
}

function SimpleSkill({skill}) {
  return (
    <div>
      {skill.fontIcon !== ""
	? <i className={skill.fontIcon + " icon"}></i>
	: <></>}
      <span>{skill.name} - {skill.level}</span>
    </div>
  );
}

function ProgressSkill({skill}) {
  // TODO: Get the actual values.
  const includedSkill = 0;
  const totalProjects = 3;

  return (
    <div className="ProgressSkill">
      <div className="icon-name">
	{skill.fontIcon && <i className={skill.fontIcon + " icon"}></i>}
	<span>{skill.name}</span>
      </div>
      <div>
	<span>Level: {skill.level.toString()}</span><br/>
	<span>Used in projects: {includedSkill}&#47;{totalProjects}</span>
      </div>
    </div>
  );
}

function Skills({resume}) {
  return (
    <div className="Skills">
      <h3>Skills</h3>
      <div className="grid">
	{resume.skills.map((e, i) => <ProgressSkill key={i} skill={e}/>)}
      </div>
    </div>
  );
}
 
class Skill {
  constructor(name, level=0, fontIcon="", showName=false) {
    this.name = name;
    this.level = level;
    this.fontIcon = fontIcon;
  }
}

class Project {
  constructor(name, link, desc) {
    this.name = name;
    this.link = link;
    this.desc = desc;
  }

  intoJSX(key=null) {
    return (
      <div className="Project" key={key}>
	<label className="bold-text">{this.name}</label><br/>
	<a className="link" href={this.link}>{this.link}</a>
	<p>{this.desc}</p>
      </div>
    );
  }
}

function Header({resume}) {
  return (
    <div className="Header">
      <div className="Header-img-box">
	<img className="Header-img" src={perfilImage} alt="me"/>
      </div>
      <div className="info">
	<div className="basic">
	  <h1>{resume.name}</h1>
	  <p>{resume.occupation}</p>
	</div>
	<div className="contact">
	  <p>{resume.contact.phone}</p>
	  <p>{resume.contact.email}</p>
	</div>
      </div>
    </div>
  );
}

function Experiences({name, experiences}) {
  return (
    <div>
      <h3>{name}</h3>
      {experiences.map((e, i) => e.intoJSX(i))}
    </div>
  );
}

function Projects({src}) {
  return (
    <div className="Projects">
      <h3>Projects</h3>
      <div className="grid">
	{src.map((e, i) => e.intoJSX(i))}
      </div>
    </div>
  );
}

function CurriculumVitae() {
  return (
    <div className="Curriculum-vitae">
      <Header resume={cv}/>
      <hr/>
      <div className="About">
	<div>
	  <h3>About</h3>
	  <p>{cv.about}</p>
	</div>
	<div>
	  <h3>Languages</h3>
	  {cv.languages.map((e, i) => <SimpleSkill key={i} skill={e}/>)}
	</div>
      </div>
      <hr/>
      <Experiences name="Education" experiences={cv.education}/>
      <hr/>
      <Experiences name="Past Jobs" experiences={cv.pastJobs}/>
      <hr/>
      <Skills resume={cv}/>
      <hr/>
      <Projects src={cv.projects}/>
    </div>
  );
}

export default CurriculumVitae;
