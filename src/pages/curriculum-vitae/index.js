import "./style.css";
import cv from "../../assets/cv";
import perfilImage from "../../assets/me.jpg";

function getStringDate(datestring) {
  let date = new Date(datestring);
  return date.toLocaleDateString('en-us', {
    day: "numeric", year: "numeric", month: "short"
  });
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

function Tags({tags}) {
  return (
    <div className="Tags">
      {tags.length > 0 &&
	  tags.map((t, i) => <span key={i} className="Tag">{t}</span>)}
    </div>
  );
}

function Experience({xp}) {
  let stringDateFrom = getStringDate(xp.from);
  let stringDateTo = getStringDate(xp.to);

  return (
    <div className="Experience">
      <span className="bold-text">{xp.name}<br/></span>
      {xp.description !== "" &&
	<span className="gray-text">{xp.description}<br/></span>}
      {stringDateFrom !== "" &&
	<span className="gray-text">From {stringDateFrom}</span>}
      <span> </span>
      {stringDateTo !== "" &&
	<span className="gray-text"> to {stringDateTo}</span>}
      <Tags tags={xp.tags}/>
    </div>
  );
}

function Experiences({name, experiences}) {
  return (
    <div>
      <h3>{name}</h3>
      {experiences.map((e, i) => <Experience key={i} xp={e}/>)}
    </div>
  );
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

function ProgressSkill({skill, projects}) {
  let includedSkill = 0;
  let totalProjects = projects.length;
  let nameNormalized = skill.name.toUpperCase();

  for (let use of projects) {
    let tags = use.tags.map(s => s.toUpperCase());
    if (tags.includes(nameNormalized)) {
      includedSkill++;
    }
  }

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
	{resume.skills.map((e, i) =>
	  <ProgressSkill key={i} skill={e} projects={resume.projects}/>)}
      </div>
    </div>
  );
}
 
function Project({project}) {
    return (
      <div className="Project">
	<label className="bold-text">{project.name}</label><br/>
	<a className="link" href={project.link}>{project.link}</a>
	<p>{project.about}</p>
	<Tags tags={project.tags}/>
      </div>
    );
}

function Projects({src}) {
  return (
    <div className="Projects">
      <h3>Projects</h3>
      <div className="grid">
	{src.map((e, i) => <Project key={i} project={e}/>)}
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
